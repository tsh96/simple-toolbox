<template lang="pug">
.grid.sm_grid-cols-2.md_grid-cols-3.lg_grid-cols-4.p-4.gap-3
  router-link.border.border-black.w-full.h-48.rounded.p-4.overflow-hidden.hover_bg-blue-100.hover_shadow-md(
    v-for="tool in tools",
    :key="tool.name",
    :to="tool.path"
  )
    .text-2xl.overflow-ellipsis.whitespace-nowrap {{ tool.name }}
    p {{ tool.description }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tools from "@/utils/tools";

export default defineComponent({
  name: "Home",
  setup() {
    return { tools };
  },
});
</script>
