<template lang="pug">
h1.w-full.text-center.text-xl.p-4 Days Between Dates

.flex.justify-center.justify-items-center.flex-col
  label.text-center.mt-4.mx-auto Start Date: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model="startDate", type="date")
  label.text-center.mt-4.mx-auto End Date: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model="endDate", type="date")
    label.block
      input.mx-2.px-2.border.rounded.border-black.text-2xl(v-model.number="includingStartDate", type="checkbox")
      | Including Start Date
  label.text-center.mt-4.mx-auto Days: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model="days", type="number", disabled)
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const includingStartDate = ref(false);

    const days = computed(() => {
      return (
        (new Date(endDate.value).getTime() -
          new Date(startDate.value).getTime()) /
          (3600 * 24 * 1000) +
        (includingStartDate.value ? 1 : 0)
      );
    });

    return { startDate, endDate, days, includingStartDate };
  },
});
</script>
