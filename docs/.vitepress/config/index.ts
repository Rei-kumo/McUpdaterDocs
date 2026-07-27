import { CustomConfig } from "./custom";
import { VpSimpleConfig } from "./vpsimple";

export default {
  ...VpSimpleConfig,
  ...CustomConfig// custom config优先级更大
};