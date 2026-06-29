import { useEffect, useState } from "react";
import { usePersistedState } from "../../../hooks/usePersistedState";
import { Field, InfoBox, PriceField } from "./ComplementsCreateStock";
import ComponentList from "./stepsCreateStock/step1/Step1";
import UnitBrandSelect from "../../brand/UnitBrandSelect";
import { useStockPriceCalc } from "../../../hooks/useStockPriceCalc";
import { formatCOP } from "../../../hooks/useCOPFormat";
import { getBaseUnit } from "../../../utils/stock.utils";


export function Step1({data, onChange }) {
      const [location] = usePersistedState("selectedLocation", "");
      const [component,setComponent] = useState("")
      useEffect(()=>{ onChange("location_id",Number(location))},[])
  return (
    <div className="flex flex-col gap-4">
        <ComponentList onSelect={(component) => {onChange("component_id",Number(component.id)),setComponent(component)}}/>
        {data.component_id && (
        <div className="text-sm bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2 text-indigo-700">
          ✅ Componente seleccionado: <strong>{component.name}</strong>
        </div>
      )}

    </div>
  );
}

export function Step2({ data, onChange, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <Field
        label="Cantidad Base" id="quantity_base" type="number"
        value={data.quantity_base} onChange={onChange} error={errors.quantity_base}
        placeholder="0"
        hint="Cantidad mínima o inicial en inventario"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-800">Unidad de Medida</label>
        <span className="text-xs text-gray-400">Selecciona o escribe la unidad</span>
       
        <UnitBrandSelect
         value={data.unit}
            onChange={(e) => onChange("unit", e.target.value)}
        />
         
        
        {errors.unit && <span className="text-xs text-red-500">{errors.unit}</span>}
      </div>
    </div>
  );
}


export function Step3({ data, onChange, errors ,calculated}) {
    const unitCost = Number(calculated.avg_price);

    return (
        <div className="flex flex-col gap-4">
        <InfoBox><span>🧾</span><span>Ingresa el precio total pagado por la compra de este stock.</span></InfoBox>
        <PriceField
            label="Precio Total de Compra" id="total_purchase_price"
            value={data.total_purchase_price} onChange={onChange} error={errors.total_purchase_price}
            hint="Costo total de adquisición del lote"
        />
        {unitCost && (
            <InfoBox>
            <span>📊</span>
            <span>Costo unitario estimado: <strong>{calculated.avg_price_formatted}</strong> por  {getBaseUnit(data.unit)}</span>
            </InfoBox>
        )}
        </div>
    );
}

export function Step4({ data, onChange, errors,calculated }) {
    const unitCost       = Number(calculated.avg_price);
    const wholesalePerUnit = Number(calculated.wholesale_per_unit);
    
  const margin = wholesalePerUnit && unitCost
    ? (((Number(wholesalePerUnit) - unitCost) / unitCost) * 100).toFixed(1)
    : null;
  const positive = margin && Number(margin) > 0;

  return (
    <div className="flex flex-col gap-4">
      <InfoBox><span>🏪</span><span>Precio de venta para clientes mayoristas o distribuidores.</span></InfoBox>
      <PriceField
        label="Precio de Venta al por Mayor" id="wholesale_price"
        value={data.wholesale_price} onChange={onChange} error={errors.wholesale_price}
        hint="Precio por unidad para venta al por mayor"
      />
      {margin && (
        <InfoBox variant={positive ? "success" : "danger"}>
          <span>{positive ? "📈" : "📉"}</span>
          <span>
            Margen sobre costo:{" "}
            <strong className={positive ? "text-green-600" : "text-red-500"}>{margin}%</strong>
          </span>
        </InfoBox>
      )}
       {unitCost && (
        <InfoBox variant={positive ? "success" : "danger"}>
          <span>{positive ? "📈" : "📉"}</span>
          <span>
            Costo por unidad:{" "}
            <strong className={positive ? "text-green-600" : "text-red-500"}>{calculated.wholesale_per_unit}</strong>
            {" "}por  {getBaseUnit(data.unit)}
          </span>
        </InfoBox>
      )}
    </div>
  );
}

export function Step5({ data, onChange, errors ,calculated}) {
    const wholesalePerUnit = Number(calculated.wholesale_per_unit);
  const consumerPerUnit  = Number(calculated.consumer_per_unit);


  const margin = consumerPerUnit && wholesalePerUnit
    ? (((Number(consumerPerUnit) - Number(wholesalePerUnit)) / Number(wholesalePerUnit)) * 100).toFixed(1)
    : null;
  const positive = margin && Number(margin) > 0;

  return (
    <div className="flex flex-col gap-4">
      <InfoBox><span>🛒</span><span>Precio final de venta al consumidor o cliente directo.</span></InfoBox>
      <PriceField
        label="Precio de Consumidor Final" id="consumer_price"
        value={data.consumer_price} onChange={onChange} error={errors.consumer_price}
        hint="Precio por unidad para venta al público"
      />
      {margin && (
        <InfoBox variant={positive ? "success" : "danger"}>
          <span>{positive ? "📈" : "📉"}</span>
          <span>
            Diferencia sobre precio mayorista:{" "}
            <strong className={positive ? "text-green-600" : "text-red-500"}>{margin}%</strong>
          </span>
        </InfoBox>
      )}
      {consumerPerUnit && (
        <InfoBox variant={positive ? "success" : "danger"}>
          <span>{positive ? "📈" : "📉"}</span>
          <span>
            Costo por unidad:{" "}
            <strong className={positive ? "text-green-600" : "text-red-500"}>{calculated.consumer_per_unit}</strong>{" "}
             por  {getBaseUnit(data.unit)}
          </span>
        </InfoBox>
      )}
    </div>
  );
}

export function Step6({ data }) {
  const sections = [
    {
      title: "Identificación",
      rows: [["ID Componente", data.component_id], ["ID Ubicación", data.location_id]],
    },
    {
      title: "Cantidad",
      rows: [["Cantidad Base", data.quantity_base], ["Unidad de Medida", data.unit]],
    },
    {
      title: "Precios",
      rows: [
        ["Precio Total Compra",     formatCOP(data.total_purchase_price)],
        ["Precio Mayorista",        formatCOP(data.wholesale_price)],
        ["Precio Consumidor Final", formatCOP(data.consumer_price)],
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-gray-400 m-0">
        Revisa los datos antes de guardar el registro de inventario.
      </p>
      {sections.map(sec => (
        <div key={sec.title}>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{sec.title}</p>
          {sec.rows.map(([label, val]) => (
            <div key={label} className="flex justify-between items-center px-3 py-2 rounded-lg bg-indigo-50 mb-1">
              <span className="text-xs font-semibold text-gray-500">{label}</span>
              <span className={`text-xs font-semibold ${val === "—" ? "text-gray-400" : "text-gray-800"}`}>{val || "—"}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
