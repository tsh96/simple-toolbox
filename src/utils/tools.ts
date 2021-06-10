import { RouteRecordRaw } from "vue-router";

const tools: (RouteRecordRaw & { description: string })[] = [
  {
    path: '/base-converter',
    name: 'Base Converter',
    description: 'Perform convertion between bases',
    component: () => import('../views/BaseConverter.vue')
  },
  {
    path: '/binary-decimal-converter',
    name: 'Binary Decimal Converter',
    component: () => import('../views/BinaryDecimalConverter.vue'),
    description:
      "Perform convertion between binary and decimal with various data type",
  },
  {
    path: '/list-randomizer',
    name: 'List Randomizer',
    component: () => import('../views/ListRandomizer.vue'),
    description: "Shuffle the list with Math.random()",
  },
]

export default tools