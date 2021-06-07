<template lang="pug">
h1.w-full.text-center.text-xl.p-4 Binary Decimal Converter

.flex.justify-center.justify-items-center.flex-col
  label.text-center.mt-4.mx-auto Decimal (Data Type: #[select(v-model="dataType") #[option(v-for="_, dataType in dataTypes" :key="dataType") {{ dataType }}]]) #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(v-model="number")
    button.border.border-black.px-2.rounded.hover_bg-gray-200(@click="setNumber()") Convert

  label.text-center.mt-4.mx-auto Binary Representation #[br]
    template(v-for="b, i in binary" :key="i")
      span.sm_text-2xl.border-gray-500.px-1.border.rounded(
        :class="{ 'bg-green-200': b, 'ml-2': i % 4 == 0 }"
        @click="flipBit(i)"
      ) {{ b }}
      br(v-if="(i+1) % 16 == 0")

  label.text-center.mt-4.mx-auto Grouped Slice (Base: #[select(v-model.number="groupedBase") #[option 10] #[option 16]], Bits: #[select(v-model.number="groupedBits") #[option 8] #[option 16]]) 
    button.px-2.border.border-black.rounded.hover_bg-gray-200(@click="flipGroup()") ⇋ 
    br
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(v-for="_, i in grouped" :key="i" v-model="grouped[i]" :size="5")

</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const buf = ref(new ArrayBuffer(8));
    const bits = computed(() => buf.value.byteLength * 8);

    const dataTypes = {
      "64-bits Unsigned Integer": {
        updateBuf: () => updateBuf(8),
        setValue: (val: string) => {
          new BigUint64Array(buf.value)[0] = BigInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new BigUint64Array(buf.value)[0].toString(),
      },
      "32-bits Unsigned Integer": {
        updateBuf: () => updateBuf(4),
        setValue: (val: string) => {
          new Uint32Array(buf.value)[0] = parseInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Uint32Array(buf.value)[0].toString(),
      },
      "16-bits Unsigned Integer": {
        updateBuf: () => updateBuf(2),
        setValue: (val: string) => {
          new Uint16Array(buf.value)[0] = parseInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Uint16Array(buf.value)[0].toString(),
      },
      "64-bits Signed Integer": {
        updateBuf: () => updateBuf(8),
        setValue: (val: string) => {
          new BigInt64Array(buf.value)[0] = BigInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new BigInt64Array(buf.value)[0].toString(),
      },
      "32-bits Signed Integer": {
        updateBuf: () => updateBuf(4),
        setValue: (val: string) => {
          new Int32Array(buf.value)[0] = parseInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Int32Array(buf.value)[0].toString(),
      },
      "16-bits Signed Integer": {
        updateBuf: () => updateBuf(2),
        setValue: (val: string) => {
          new Int16Array(buf.value)[0] = parseInt(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Int16Array(buf.value)[0].toString(),
      },
      "32-bits Float": {
        updateBuf: () => updateBuf(4),
        setValue: (val: string) => {
          new Float32Array(buf.value)[0] = parseFloat(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Float32Array(buf.value)[0].toString(),
      },
      "64-bits Float": {
        updateBuf: () => updateBuf(8),
        setValue: (val: string) => {
          new Float64Array(buf.value)[0] = parseFloat(val);
          buf.value = buf.value.slice(0);
        },
        getValue: () => new Float64Array(buf.value)[0].toString(),
      },
    };

    function updateBuf(size: number) {
      const newBuf = new ArrayBuffer(size);
      const N = Math.min(newBuf.byteLength, buf.value.byteLength);
      for (let i = 0; i < N; i++) {
        new Uint8Array(newBuf)[i] = new Uint8Array(buf.value)[i];
      }
      buf.value = newBuf;
    }

    const number = ref("0");
    watch(buf, () => (number.value = dataTypes[dataType.value].getValue()));
    function setNumber() {
      dataTypes[dataType.value].setValue(number.value);
    }

    const dataType = ref<keyof typeof dataTypes>("64-bits Unsigned Integer");
    const binary = computed(() => {
      let i = 0;
      const b = Array<number>(buf.value.byteLength * 8).fill(0);
      new Uint8Array(buf.value).forEach((num) => {
        for (var j = 0; j < 8; j++) {
          b[i] = (num >> j) & 1;
          i++;
        }
      });
      return b.reverse();
    });

    const groupedBase = ref<10 | 16>(10);
    const groupedBits = ref<8 | 16>(16);
    const grouped = ref<string[]>(["0", "0", "0", "0"]);
    watch([buf, groupedBase, groupedBits], () => {
      const newGrouped: string[] = [];
      if (groupedBits.value == 16) {
        new Uint16Array(buf.value).forEach((num, i) => {
          newGrouped[i] = num.toString(groupedBase.value);
        });
      } else {
        new Uint8Array(buf.value).forEach((num, i) => {
          newGrouped[i] = num.toString(groupedBase.value);
        });
      }
      grouped.value = newGrouped.reverse();
    });

    watch(
      grouped,
      (val) => {
        const TypedArray = groupedBits.value == 16 ? Uint16Array : Uint8Array;
        const N = bits.value / groupedBits.value - 1;
        val.forEach((num, i) => {
          if (
            num !== parseInt(num, groupedBase.value).toString(groupedBase.value)
          ) {
            grouped.value[i] = parseInt(num, groupedBase.value).toString(
              groupedBase.value
            );
          }
        });
        const needUpdate = !val.every(
          (num, i) =>
            new TypedArray(buf.value)[N - i] ===
            parseInt(num, groupedBase.value)
        );
        if (!needUpdate) return;
        val.forEach((num, i) => {
          new TypedArray(buf.value)[N - i] = parseInt(num, groupedBase.value);
        });
        buf.value = buf.value.slice(0);
      },
      { deep: true }
    );

    function flipBit(i: number) {
      i = bits.value - i - 1;
      new Uint8Array(buf.value)[Math.floor(i / 8)] ^= 1 << i % 8;
      buf.value = buf.value.slice(0);
    }

    watch(dataType, (val) => {
      dataTypes[val].updateBuf();
    });

    function flipGroup() {
      for (let i = 0; i < grouped.value.length >> 1; i++) {
        const temp = grouped.value[i];
        grouped.value[i] = grouped.value[grouped.value.length - 1 - i];
        grouped.value[grouped.value.length - 1 - i] = temp;
      }
    }

    return {
      number,
      binary,
      dataTypes,
      dataType,
      buf,
      bits,
      flipBit,
      setNumber,
      grouped,
      groupedBase,
      groupedBits,
      flipGroup,
    };
  },
});
</script>
