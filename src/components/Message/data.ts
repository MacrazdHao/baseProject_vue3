import { ref } from "vue";

interface MessageType {
  [key: string]: any;
}

const messages = ref<Array<any>>([]);

export const getDataRefs = () => {
  return messages;
};

export const pushMsg = (msg: MessageType) => {
  messages.value = [...messages.value, msg];
};
