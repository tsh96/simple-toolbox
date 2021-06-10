<template lang="pug">
h1.w-full.text-center.text-xl.p-4 List Randomizer

div(ref="listRef")
  .text-center.py-2.flex.justify-center.justify-items-center(v-for="item, i in items" :key="item.id")
    input.border.border-black.rounded.text-2xl(v-model="item.text" @keypress.enter="enter(i)" @blur="blur(i)" @paste.prevent="paste($event, i)")
    button.ml-2.rounded(@click="remove(i)") ❌ 

.text-center.pt-2
  button.text-white.bg-black.p-2.px-8.rounded(@click="shuffle") Shuffle
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ListRandomizer",
  setup() {
    let id = 0;
    function getId() {
      return id++;
    }

    const listRef = ref<HTMLDivElement>();
    const items = ref<{ id: number; text: string }[]>([
      { id: getId(), text: "" },
    ]);

    function enter(i: number) {
      items.value.splice(i + 1, 0, { id: getId(), text: "" });
      setTimeout(() => focus(i + 1));
    }

    function blur(i: number) {
      if (items.value.length > 1 && items.value[i].text === "") {
        items.value.splice(i, 1);
      }
    }

    function remove(i: number) {
      items.value.splice(i, 1);
      if (items.value.length === 0) items.value.push({ id: getId(), text: "" });
    }

    function paste(e: ClipboardEvent, i: number) {
      const texts =
        e.clipboardData
          ?.getData("text")
          ?.split("\n")
          .filter((text) => text !== "") || [];
      items.value[i].text += texts.shift();
      items.value.splice(
        i + 1,
        0,
        ...texts.map((text) => ({ id: getId(), text }))
      );

      setTimeout(() => focus(i + texts.length));
    }

    function focus(i: number) {
      listRef.value?.children?.[i].querySelector("input")?.focus();
    }

    function shuffle() {
      items.value.sort(() => Math.random() - 0.5);
    }

    return { listRef, items, enter, blur, remove, paste, shuffle };
  },
});
</script>
