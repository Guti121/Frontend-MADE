import { useState } from "react";

// usePersistedState.js
export function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    try {
      return JSON.parse(stored); // <-- parse objects
    } catch {
      return stored; // <-- fallback for plain strings
    }
  });

  const setPersistedValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue)); // <-- serialize objects
  };

  return [value, setPersistedValue];
}

export const getUnitMeasure = () => {
  const [brand] = usePersistedState("brand", {});
  return brand?.weight ? "g" : "ml";
};
