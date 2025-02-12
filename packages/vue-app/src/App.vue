<template>
  <div>
    <Input />
    <Button>button</Button>

    <Video width="300px" heigh="300px" :controls="false"
      src="//cxvideo5.123cx.com/live/040092661084-1.flv?deviceNo=e3bac9f0-a579-11ef-abfc-fbf261f0d646&dataType=0&streamType=1&token=b74b7188-b7e5-49b3-a017-7cf0c3142bc8" />

    <Video connetMethod="websocket" width="300px" heigh="300px" :controls="false"
      src="wss://cxvideo-ws.123cx.com/websocket/040092661024-2?deviceNo=6fd05230-a31c-11ef-b440-ef6b7d1e8a1d&dataType=0&streamType=1&token=b74b7188-b7e5-49b3-a017-7cf0c3142bc8&channel=2" />
  </div>
</template>

<script setup>
import { Button, Input, Video } from "@chu-xin/components"
</script>