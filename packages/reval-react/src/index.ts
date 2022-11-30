import { useState, useEffect, useSyncExternalStore } from "react";
import { Reval } from "@qiuyl/reval";
export const useVal = ({ subscribe, getValue, setValue }: Reval) => {
  if (useSyncExternalStore) {
    return [useSyncExternalStore(subscribe as any, getValue), setValue];
  }

  const [val, setVal] = useState(getValue);

  useEffect(subscribe.bind(null, setVal.bind(null)), []);

  return [val, setValue];
};
