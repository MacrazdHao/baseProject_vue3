import { ref } from "vue";

const visible = ref(false);
const tips = ref("");

export const getDataRefs = () => {
  return { visible, tips };
};

export const toggle = (value: boolean, content?: string) => {
  visible.value = value;
  content && (tips.value = content);
};
