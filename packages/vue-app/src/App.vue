<template>
  <div>
    <router-view></router-view>
    
    <Input />
    <Button>button</Button>
    <Video width="300px" heigh="300px" :controls="false" :src="flvSrc" />
    <Video connetMethod="websocket" width="300px" heigh="300px" :controls="false" :src="wsFlvSrc" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Button, Input, Video } from "@chu-xin/components";

const flvSrc = ref("")
const wsFlvSrc = ref("")
</script>