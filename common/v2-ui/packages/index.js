import Button from "./Button";

export const components = [
  Button
];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component, component.name)
  })
}


export default {
  install,
  Button
};
