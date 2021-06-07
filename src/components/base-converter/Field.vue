<template lang="pug">
label.text-center.mt-4.mx-auto #[slot] #[br]
  input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
    v-model="value"
    @input="$emit('update:modelValue', value); value = modelValue"
  )
  .text-right.text-xs.text-gray-400.mr-4 digits: {{ value.length }}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: String, required: true }
  },
  setup(props) {
    const value = ref("0")
    watch(() => props.modelValue, () => value.value = props.modelValue)
    onMounted(() => value.value = props.modelValue)
    return { value }
  }
})
</script>