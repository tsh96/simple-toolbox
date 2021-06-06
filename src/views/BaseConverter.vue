<template lang="pug">
h1.w-full.text-center.text-xl.p-4 Base Converter

.flex.justify-center.justify-items-center.flex-col
  label.text-center.mt-4.mx-auto Binary (Base 2): #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
      v-model="base2"
    )
    .text-right.text-xs.text-gray-400.mr-4 digits: {{ base2.length }}
  label.text-center.mt-4.mx-auto Octal (Base 8): #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
      v-model="base8"
    )
    .text-right.text-xs.text-gray-400.mr-4 digits: {{ base8.length }}
  label.text-center.mt-4.mx-auto Decimal (Base 10): #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
      v-model="base10"
    )
    .text-right.text-xs.text-gray-400.mr-4 digits: {{ base16.length }}
  label.text-center.mt-4.mx-auto Hexadecimal (Base 16): #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
      v-model="base16"
    )
    .text-right.text-xs.text-gray-400.mr-4 digits: {{ base16.length }}
  label.text-center.mt-4.mx-auto Custom (Base #[select(v-model="base") #[option(v-for="i in 35", :key="i + 1", :value="i + 1") {{ i + 1 }}]]): #[br]
    input.mx-2.px-2.border.rounded.border-black.font-mono.text-2xl(
      v-model="baseCustom"
    )
    .text-right.text-xs.text-gray-400.mr-4 digits: {{ baseCustom.length }}
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Base Converter",
  setup() {
    const base2 = ref("0");
    const base8 = ref("0");
    const base10 = ref("0");
    const base16 = ref("0");

    const baseCustom = ref("0");
    const base = ref(36);

    const num = ref(0n);

    const charMap = "0123456789abcdefghijklmnopqrstuvwxyz"
      .split("")
      .reduce((carry, char, index) => {
        carry[char] = BigInt(index);
        return carry;
      }, {} as { [char: string]: bigint });

    function parseBigInt(s: string, base: bigint) {
      let bigInt = 0n;
      let carry = 1n;
      s.split("")
        .reverse()
        .forEach((c) => {
          if (charMap[c] === undefined) return;
          if (charMap[c] >= base) return;
          bigInt += charMap[c] * carry;
          carry *= base;
        });
      return bigInt;
    }

    function applyNumber() {
      if (Number.isNaN(num.value)) {
        num.value = 0n;
      }
      if (base2.value !== num.value.toString(2)) {
        base2.value = num.value.toString(2);
      }
      if (base8.value !== num.value.toString(8)) {
        base8.value = num.value.toString(8);
      }
      if (base10.value !== num.value.toString(10)) {
        base10.value = num.value.toString(10);
      }
      if (base16.value !== num.value.toString(16)) {
        base16.value = num.value.toString(16);
      }
      if (baseCustom.value !== num.value.toString(base.value)) {
        baseCustom.value = num.value.toString(base.value);
      }
    }

    watch(base, applyNumber);

    watch(base2, (value) => {
      num.value = parseBigInt(value, 2n);
      applyNumber();
    });

    watch(base8, (value) => {
      num.value = parseBigInt(value, 8n);
      applyNumber();
    });

    watch(base10, (value) => {
      num.value = parseBigInt(value, 10n);
      applyNumber();
    });

    watch(base16, (value) => {
      num.value = parseBigInt(value, 16n);
      applyNumber();
    });

    watch(baseCustom, (value) => {
      num.value = parseBigInt(value, BigInt(base.value));
      applyNumber();
    });

    return {
      base2,
      base8,
      base10,
      base16,
      base,
      baseCustom,
    };
  },
});
</script>

<style>
</style>