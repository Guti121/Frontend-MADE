

const formatCOP = (value) => `$${Number(value).toLocaleString("es-CO")}`;

const calcItemTotal = (item, is_wholesale) => {
  const componentsTotal = item.sales_components.reduce((sum, c) => {
    const price = is_wholesale ? Number(c.wholesale_price) : Number(c.consumer_price);
    return sum + price * Number(c.quantity_used);
  }, 0);

  const containerTotal =
    (is_wholesale
      ? Number(item.sales_container.wholesale_price)
      : Number(item.sales_container.consumer_price)) *
    Number(item.sales_container.quantity_used);

  return (componentsTotal + containerTotal) * Number(item.quantity);
};

// ── FORMULA SUMMARY (inside each item card) ───────────────
export function FormulaItemSummary({ item, itemIndex, is_wholesale }) {
  if (!item.formula_id) return null;

  return (
    <div className="bg-slate-50 rounded-lg p-4 space-y-2 border-t">
      <h4 className="text-sm font-semibold text-gray-600">
        Resumen Formula #{itemIndex + 1}
      </h4>

      {/* Components breakdown */}
      {item.sales_components
        .filter((c) => c.component_id)
        .map((comp, i) => {
          const price = is_wholesale
            ? Number(comp.wholesale_price)
            : Number(comp.consumer_price);
          return (
            <div key={i} className="flex justify-between text-xs text-gray-500">
              <span>{comp.component_name} x {comp.quantity_used}</span>
              <span>{formatCOP(price * Number(comp.quantity_used))}</span>
            </div>
          );
        })}

      {/* Container breakdown */}
      {item.sales_container.container_id && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {item.sales_container.container_name} x {item.sales_container.quantity_used}
          </span>
          <span>
            {formatCOP(
              (is_wholesale
                ? Number(item.sales_container.wholesale_price)
                : Number(item.sales_container.consumer_price)) *
              Number(item.sales_container.quantity_used)
            )}
          </span>
        </div>
      )}

      <div className="border-t pt-2 flex justify-between text-sm font-medium">
        <span>Subtotal x {item.quantity} unidad(es)</span>
        <span>{formatCOP(calcItemTotal(item, is_wholesale))}</span>
      </div>
    </div>
  );
}

// ── BILL TOTAL (below all items) ──────────────────────────
export function SaleBillSummary({ sales_items, is_wholesale }) {
  if (sales_items.length === 0) return null;

  const billTotal = sales_items.reduce(
    (sum, item) => sum + calcItemTotal(item, is_wholesale),
    0
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-3">
      <h2 className="font-semibold text-lg">Resumen de Venta</h2>

      {sales_items.map((item, i) =>
        item.formula_id ? (
          <div key={i} className="flex justify-between text-sm text-gray-600">
            <span>Formula #{i + 1} — {item.formula_name}</span>
            <span>{formatCOP(calcItemTotal(item, is_wholesale))}</span>
          </div>
        ) : null
      )}

      <div className="border-t pt-3 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatCOP(billTotal)}</span>
      </div>

      <p className="text-xs text-gray-400">
        {is_wholesale ? "Precio mayorista aplicado" : "Precio consumidor aplicado"}
      </p>
    </div>
  );
}