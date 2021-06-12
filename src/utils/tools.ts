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
  {
    path: '/days-between-dates',
    name: 'Days Between Dates',
    component: () => import('../views/DaysBetweenDates.vue'),
    description: "Calculate the days between two dates",
  },
  {
    path: '/date-after-days',
    name: 'Date After Days',
    component: () => import('../views/DateAfterDays.vue'),
    description: "Calculate the date after/before days from a given date",
  },
  {
    path: '/work-in-progress',
    name: 'Unit Converter (WIP)',
    component: () => import('../views/WorkInProgress.vue'),
    // path: '/unit-converter',
    // name: 'Unit Converter',
    // component: () => import('../views/UnitConverter.vue'),
    description: "Convert between units",
  },
  {
    path: '/qr-code-generator',
    name: 'QR code generator',
    component: () => import('../views/QrCodeGenerator.vue'),
    description: "Text to QR code generator",
  },
  {
    path: '/qr-code-reader',
    name: 'QR code reader',
    component: () => import('../views/QrCodeReader.vue'),
    description: "QR code to text reader with camera or files",
  },
  {
    path: '/work-in-progress',
    name: 'Serial Port (WIP)',
    component: () => import('../views/WorkInProgress.vue'),
    // path: '/serial-port',
    // name: 'Serial Port',
    // component: () => import('../views/SerialPort.vue'),
    description: "Send/Receive data from serial port",
  },
  {
    path: '/work-in-progress',
    name: 'Modbus Client (WIP)',
    component: () => import('../views/WorkInProgress.vue'),
    // path: '/modbus-client',
    // name: 'Modbus Client',
    // component: () => import('../views/ModbusClient.vue'),
    description: "RTU Modbus Client",
  },
]

export default tools