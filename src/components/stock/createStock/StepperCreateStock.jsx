import { steps } from "./ComplementsCreateStock";

export function Stepper({ current }) {
  const total = steps.length;
  const progress = ((current - 1) / (total - 1)) * 100;

  return (
    <div className="mb-7">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Dots */}
      <div className="flex justify-between">
        {steps.map(s => {
          const done   = s.id < current;
          const active = s.id === current;
          return (
            <div key={s.id} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                ${done   ? "bg-green-500 text-white"
                : active ? "bg-indigo-500 text-white ring-4 ring-indigo-100"
                :          "bg-gray-100 text-gray-400"}`}>
                {done ? "✓" : s.icon}
              </div>
              <span className={`text-[10px] font-semibold whitespace-nowrap
                ${active ? "text-indigo-500" : done ? "text-green-500" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}