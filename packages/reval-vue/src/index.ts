import { Reval } from "@qiuyl/reval";
import { ref, onBeforeMount, onUnmounted } from "vue";
export const useVueVal = ({ subscribe, getValue, setValue }: Reval) => {
  const valueFef = ref(getValue());
  const unSub = ref();

  onBeforeMount(() => {
    unSub.value = subscribe((value) => {
      valueFef.value = value;
    });
  });

  onUnmounted(() => {
    unSub.value();
  });

  return [valueFef.value, setValue];
};
