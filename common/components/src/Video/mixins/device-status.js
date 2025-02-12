/**
 * 开启视频通道功能
 */
import {queryOnlineAndACC, queryOnlineAndACCByStation} from '../service';
import fetch from 'src/base/utils/fetch';

const getParamsFromUrl = (src) => {
  if (!src) {
    return;
  }
  // 播放url支持配置、自适应前缀功能
  const url = new URL(src.replace(/^(\w+:)*\/\//i, (a, b) => {
    a = (a || '').toLowerCase();
    // 自适应前缀: http -> ws，https -> wss
    const autoPrefix = location.protocol.replace('http', 'ws');
    return b ? a : `${autoPrefix}${a}`;
  }));
  const params = ['token', 'deviceNo', 'streamType', 'dataType', 'channelNo'].reduce((p, c) => {
    p[c] = url.searchParams.get(c) ?? p[c];
    return p;
  }, {});
  const [, sim, channelNo] = url.pathname.match(/\/(\d+)-(\d+)$/) || [];
  params.sim = sim;
  params.channelNo = channelNo ?? params.channelNo;
  params.streamType = {0: 'high', 1: 'low'}[params.streamType || 0];
  params.url = `${url.href}&channel=${params.channelNo}`;
  return params;
};

export default {
  inject: {
    getVideoDeviceId: {
      default() {},
    },
    getVideoPlateNumber: {
      default() {},
    },
  },
  props: {
    // 连接方式
    connetMethod: String,
  },
  data() {
    return {
      accStatus: '0',
      deviceErrorContent: null,
      eventName: '',
      accLoading: true,
    };
  },
  computed: {
    connectType() {
      return {
        'websocket': 'flash',
      }[this.connetMethod];
    },
    connectUrl() {
      if (!this.connectType) return null;
      const params = getParamsFromUrl(this.url);
      return (!this.deviceErrorContent && params?.url) || '';
    },
  },
  watch: {
    src: {
      immediate: true,
      handler() {
        this.switching = true;
        this.$nextTick(() => {
          this.switching = false;
        });
        this.queryStatus();
        switch (this.connetMethod) {
          case 'http-dynamic': {
            this.doHttpDynamic();
          } break;
        }
      },
    },
  },
  methods: {
    doHttpDynamic() {
      if (this.src) {
        fetch(this.src).then(({result, data, resultDesc}) => {
          if (result) {
            this.url = data;
          } else {
            this.$Message.error(resultDesc);
          }
        }).catch((err) => {
          console.error(err);
          this.$Message.error('获取视频播放地址失败');
        });
      }
    },
    queryStatus() {
      const plateNumber = this.getVideoPlateNumber?.();
      const deviceId = plateNumber || this.getVideoDeviceId?.();
      if (deviceId) {
        this.deviceErrorContent = null;
        this.eventName = `itbus.video.device_${deviceId}`;
        window.addEventListener(this.eventName, this.statusHandler);
        const errMsg = window.__itbus__video_device_status?.[deviceId];
        if (errMsg) {
          if (typeof errMsg === 'string') {
            this.deviceErrorContent = errMsg;
          }
          return;
        } else {
          window.__itbus__video_device_status = {
            ...window.__itbus__video_device_status,
            [deviceId]: true,
          };
        }
        this.accLoading = true;
        const fetchData = plateNumber ? queryOnlineAndACC : queryOnlineAndACCByStation;
        fetchData({
          'plateNumber': plateNumber,
          'iotDeviceId': deviceId, // iot设备id
        }).then(({data}) => {
        // {onlineStatus: 'false' 离线，'true' 在线, accStatus: '1' 开启， '0' 关闭}
          this.accStatus = data?.accStatus ?? this.accStatus;
          let msg = null;
          if (data?.onlineStatus !== 'true') {
            msg = '当前设备处于离线状态，无法查看视频';
          }
          window.__itbus__video_device_status[deviceId] = msg;
          window.dispatchEvent(new CustomEvent(this.eventName, {detail: {...data, msg, deviceNo: deviceId}}));
        }).finally(() => {
          this.accLoading = false;
        });
      }
    },
    statusHandler(e) {
      const {detail: data} = e;
      this.accStatus = data?.accStatus;
      if (data.onlineStatus !== 'true' || data.accStatus !== '1') {
        const isExist = window.__itbus__video_device_status[data.deviceNo];
        if (!isExist && this.deviceErrorContent) {
          this.$Message.error(this.deviceErrorContent);
        }
        this.deviceErrorContent = data.msg;
        return;
      }
    },
  },
  beforeDestroy() {
    const deviceNo = this.eventName.split('_')[1];
    if (window.__itbus__video_device_status?.[deviceNo]) {
      delete window.__itbus__video_device_status[deviceNo];
    }
    window.removeEventListener(this.eventName, this.statusHandler);
  },
};
