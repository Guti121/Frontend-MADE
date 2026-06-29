import { useEffect, useState } from "react";
import { toBaseUnit } from "../utils/stock.utils";
import { formatCOP } from "./useCOPFormat";

// THIS FUNCTION IS USED IN PURSHASE VIEW
export function useStockPriceCalc({
  quantity_base,
  unit,
  total_purchase_price,
  consumer_price,
  wholesale_price,
}) {
  const [calculated, setCalculated] = useState({
    avg_price: 0,
    avg_price_formatted: "—",
    consumer_per_unit: 0,
    consumer_formatted: "—",
    wholesale_per_unit: 0,
    wholesale_formatted: "—",
  });

  useEffect(() => {
    const { value: qty } = toBaseUnit(Number(quantity_base), unit);
    const total = Number(total_purchase_price);
    const consumer = Number(consumer_price);
    const wholesale = Number(wholesale_price);

    if (qty > 0 && total > 0) {
      const avg = total / qty;
      const consumerPerUnit = consumer > 0 ? consumer / qty : 0;
      const wholesalePerUnit = wholesale > 0 ? wholesale / qty : 0;

      setCalculated({
        avg_price: avg.toFixed(2),
        avg_price_formatted: formatCOP(avg),

        consumer_per_unit: consumerPerUnit.toFixed(2),
        consumer_formatted:
          consumerPerUnit > 0 ? formatCOP(consumerPerUnit) : "—",

        wholesale_per_unit: wholesalePerUnit.toFixed(2),
        wholesale_formatted:
          wholesalePerUnit > 0 ? formatCOP(wholesalePerUnit) : "—",
      });
    } else {
      setCalculated({
        avg_price: 0,
        avg_price_formatted: "—",
        consumer_per_unit: 0,
        consumer_formatted: "—",
        wholesale_per_unit: 0,
        wholesale_formatted: "—",
      });
    }
  }, [
    quantity_base,
    unit,
    total_purchase_price,
    consumer_price,
    wholesale_price,
  ]);

  return calculated;
}
