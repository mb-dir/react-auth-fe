import { useState, useEffect } from "react";

const getLocalValue = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "");
};

const useLocalStorage = (key: string, initValue: string) => {
  const [ value, setValue ] = useState(() => getLocalValue(key) || initValue);

  useEffect(
    () => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [ key, value ]
  );

  return [ value, setValue ];
};

export default useLocalStorage;
