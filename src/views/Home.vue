<template lang="pug">
.grid.sm_grid-cols-2.md_grid-cols-3.lg_grid-cols-4.p-4.gap-3
  router-link.border.border-black.w-full.h-48.rounded.p-4.overflow-hidden.hover_bg-blue-100.hover_shadow-md(
    v-for="tool in tools",
    :key="tool.name",
    :to="tool.link"
  )
    .text-2xl.overflow-ellipsis.whitespace-nowrap {{ tool.name }}
    p {{ tool.description }}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    type ToolInfo = {
      link: string;
      name: string;
      description: string;
    };

    return {
      tools: ref<ToolInfo[]>([
        {
          name: "Base Converter",
          link: "base-converter",
          description: "Perform convertion between bases",
        },
        {
          name: "Binary Decimal Converter",
          link: "binary-decimal-converter",
          description: "Perform convertion between binary and decimal with various data type",
        },
      ]),
    };
  },
});
</script>
