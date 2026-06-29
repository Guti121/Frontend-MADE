import { useState } from "react";
import { INIT, steps, validate } from "./ComplementsCreateStock";
import { Stepper } from "./StepperCreateStock";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./StepsCreateStock";
import { useStockPriceCalc } from "../../../hooks/useStockPriceCalc";
import { createStock } from "../../../services/stock.service";
import { useNavigate } from "react-router-dom";

export default function MultiStepForm() {
  const [step, setStep]        = useState(1);
  const [data, setData]        = useState(INIT);
  const [errors, setErrors]    = useState({});
  const [shake, setShake]      = useState(false);
  const [submitted, setSubmit] = useState(false);

  const navigate = useNavigate(); 
  const handleChange = (id, value) => {
    setData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const next = () => {
    const err = validate(step, data);
    if (Object.keys(err).length) {
      setErrors(err);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setErrors({});
    if (step < 6) setStep(s => s + 1);
    else handleSave(data);
  };

  const handleSave = async (data) => {
  try {
    await createStock({
      ...data,
      quantity_base:        Number(data.quantity_base),
      total_purchase_price: Number(data.total_purchase_price),
      wholesale_price:      Number(data.wholesale_price),
      consumer_price:       Number(data.consumer_price),
    });
    setSubmit(true)
    
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error al guardar el stock");
  }
};

  const back  = () => { setErrors({}); setStep(s => s - 1); };
  const reset = () => { setStep(1); setData(INIT); setErrors({}); setSubmit(false); };

  // Single source of truth for all calculations
  const calculated = useStockPriceCalc({
    quantity_base:        data.quantity_base,
    unit:                 data.unit,
    total_purchase_price: data.total_purchase_price,
    wholesale_price:      data.wholesale_price,
    consumer_price:       data.consumer_price,
  });


  const content = {
    1: <Step1 data={data} onChange={handleChange} errors={errors} />,
    2: <Step2 data={data} onChange={handleChange} errors={errors} />,
    3: <Step3 data={data} onChange={handleChange} errors={errors}   calculated={calculated} />,
    4: <Step4 data={data} onChange={handleChange} errors={errors}   calculated={calculated}/>,
    5: <Step5 data={data} onChange={handleChange} errors={errors}   calculated={calculated}/>,
    6: <Step6 data={data} />,
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-5 font-sans">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-14 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">¡Registro guardado!</h2>
          <p className="text-sm text-gray-400 mb-8">El stock ha sido registrado exitosamente en el inventario.</p>
          <button onClick={reset} className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer border-none">
            Nuevo registro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-5 font-sans">
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)}
        }
        .shake { animation: shake .35s ease; }
      `}</style>

      <div className={`w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 ${shake ? "shake" : ""}`}>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">
            Paso {step} de {steps.length}
          </p>
          <h1 className="text-xl font-extrabold text-gray-800 m-0">
            {steps[step - 1].icon} {steps[step - 1].label}
          </h1>
        </div>

        <Stepper current={step} />

        {/* Step content */}
        <div className="min-h-48">
          {content[step]}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-7 gap-3">
          <button
            onClick={back} disabled={step === 1}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold border-none transition-colors cursor-pointer
              ${step === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"}`}
          >
            ← Atrás
          </button>
          <button
            onClick={next}
            className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl border-none transition-colors cursor-pointer"
          >
            {step === 6 ? "💾 Guardar" : "Siguiente →"}
          </button>
        </div>
      </div>
    </div>
  );
}

