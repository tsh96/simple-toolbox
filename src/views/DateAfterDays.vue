<template lang="pug">
h1.w-full.text-center.text-xl.p-4 Date After Days

.flex.justify-center.justify-items-center.flex-col
  label.text-center.mt-4.mx-auto Start Date: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model="startDate", type="date")
  label.text-center.mt-4.mx-auto Days: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model.number="days", type="number")
    label.block
      input.mx-2.px-2.border.rounded.border-black.text-2xl(v-model.number="includingStartDate", type="checkbox")
      | Including Start Date
  label.text-center.mt-4.mx-auto Date after days: #[br]
    input.mx-2.px-2.border.rounded.border-black.text-2xl.w-72(v-model="dateAfterDays", type="date", disabled)
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const startDate = ref("");
    const days = ref(0);
    const includingStartDate = ref(false);

    const dateAfterDays = computed(() => {
      const targetDate = new Date(
        new Date(startDate.value).getTime() +
          (days.value + (includingStartDate.value ? -1 : 0)) * 3600 * 24 * 1000
      );

      if (Number.isNaN(targetDate.getTime())) {
        return "";
      }

      return targetDate.toISOString().substring(0, 10);
    });

    return { startDate, days, includingStartDate, dateAfterDays };
  },
});
</script>
