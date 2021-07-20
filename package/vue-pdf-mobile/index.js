// 导入组件，组件必须声明 name
import plugin from "./main.vue";

// 为组件添加 install 方法，用于按需引入
plugin.install = function (Vue) {
  Vue.component(plugin.name, plugin);
};

export default plugin;
