<template lang="pug">
h1.w-full.text-center.text-xl.p-4 QR Code Generator

.flex.justify-center.justify-items-center.flex-col
  label.text-center.mt-4.mx-auto Text: #[br]
    textarea.mx-2.px-2.border.rounded.border-black.font-mono.text-xl.w-72(v-model="text")
  label.text-center.mt-4.mx-auto QR Code: #[br]
    canvas.border.border-black.rounded(ref="canvasRef")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import QRCode from "qrcode";

export default defineComponent({
  setup() {
    const text = ref("");
    const canvasRef = ref<HTMLCanvasElement>();

    watch(text, () => {
      QRCode.toCanvas(canvasRef.value, text.value, { width: 200 });
    });

    return { text, canvasRef };
  },
});
</script>
