<template lang="pug">
h1.w-full.text-center.text-xl.p-4 QR Code Reader

.flex.justify-center.justify-items-center.flex-col
  div.text-center
    button.px-2.border.border-black.rounded.hover_bg-gray-300.mx-2(@click="openFile") File
    button.px-2.border.border-black.rounded.hover_bg-gray-300.mx-2(v-if="hasCamera" @click="control ? closeCamera(): openCamera()") {{control ? "Close": "Open"}} Camera
    button.px-2.border.border-black.rounded.mx-2(v-else disabled) Camera Not Found
  label.text-center.mt-4.mx-auto(v-if="hasCamera") Camera:
    select(v-model="cameraId")
      option(v-for="c in cameras" :key="c.deviceId" :value="c.deviceId") {{ c.label }}
  input(v-show="false" @change="fileChange" type="file" ref="fileInputRef" accept="image/*")
  video(v-show="showVideo" ref="videoRef" style="max-height: 50vh;")
  label.text-center.mt-4.mx-auto Text: #[br]
    textarea.mx-2.px-2.border.rounded.border-black.font-mono.text-xl.w-72(v-model="text" readonly)
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import {
  BrowserCodeReader,
  BrowserQRCodeReader,
  IScannerControls,
} from "@zxing/browser";

export default defineComponent({
  setup() {
    const codeReader = new BrowserQRCodeReader();
    const text = ref("");

    const videoRef = ref<HTMLVideoElement>();
    const showVideo = ref(false);
    const cameras = ref<MediaDeviceInfo[]>([]);
    const cameraId = ref<string>();
    onMounted(async () => {
      cameras.value = await BrowserCodeReader.listVideoInputDevices();
      cameraId.value = cameras.value[0]?.deviceId;
    });
    watch(cameraId, () => {
      if (!control.value) return;
      closeCamera();
      openCamera();
    });
    const hasCamera = computed(() => !!cameras.value.length);
    const control = ref<IScannerControls>();
    async function openCamera() {
      console.log("open Camera");
      control.value = await codeReader.decodeFromVideoDevice(
        cameraId.value,
        videoRef.value,
        (result) => {
          text.value = result?.getText() || "";
        }
      );

      showVideo.value = true;
    }
    async function closeCamera() {
      if (!control.value) return;
      control.value.stop();
      control.value = undefined;
      showVideo.value = false;
    }

    const fileInputRef = ref<HTMLInputElement>();
    function openFile() {
      showVideo.value = false;
      fileInputRef.value?.click();
    }

    function fileChange() {
      const file = fileInputRef.value?.files?.[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function(event) {
        codeReader
          .decodeFromImageUrl(event.target?.result as string)
          .then((result) => {
            text.value = result.getText();
          })
          .catch((e) => {
            alert(e);
          });
      };
      reader.readAsDataURL(file);
    }

    return {
      text,
      videoRef,
      showVideo,
      fileInputRef,
      fileChange,
      openFile,
      cameras,
      cameraId,
      hasCamera,
      openCamera,
      closeCamera,
      control,
    };
  },
});
</script>
