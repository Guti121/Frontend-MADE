// src/utils/unit.utils.js

export function toBaseUnit(value, unit) {
  switch (unit) {
    case "L":
      return { value: value * 1000, unit: "ml" };
    case "kg":
      return { value: value * 1000, unit: "g" };
    case "ml":
      return { value, unit: "ml" }; // already base
    case "g":
      return { value, unit: "g" }; // already base
    default:
      return { value, unit };
  }
}

export const getBaseUnit = (unit) => {
  if (unit === "kg" || unit === "g") {
    return "g";
  }

  if (unit === "L" || unit === "ml") {
    return "ml";
  }

  return unit;
};
