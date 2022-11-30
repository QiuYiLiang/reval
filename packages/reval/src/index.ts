type Listen<T = any> = (value?: T) => void;

export interface Reval<T = any> {
  subscribe: (listen: Listen<T>) => void;
  setValue: (value?: T) => void;
  getValue: () => T;
}

export function reval<T>(val: T): Reval {
  const listens = new Set<Listen>();

  const subscribe: Reval["subscribe"] = (listen) => {
    listens.add(listen);
    return () => {
      listens.delete(listen);
    };
  };

  const setValue: Reval["setValue"] = (value) => {
    val = value;
    listens.forEach((listen) => listen(val));
  };
  const getValue: Reval["getValue"] = () => val;

  return {
    subscribe,
    setValue,
    getValue,
  };
}
