import { Truck, CheckCircle2, XCircle } from "lucide-react";
import TripStateStepper from "./TripStateStepper";

export default function CapacityPanel({ cargoWeight, maxCapacity, stage }) {
  const weight = Number(cargoWeight) || 0;
  const capacity = Number(maxCapacity) || 1;
  const percent = Math.min(100, (weight / capacity) * 100);
  const eligible = weight > 0 && weight <= capacity;

  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center gap-5 mb-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={eligible ? "#22c55e" : "#ef4444"}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Truck size={26} className={eligible ? "text-green-600" : "text-red-500"} />
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold text-slate-900">
            {weight} kg{" "}
            <span className="text-base font-normal text-slate-500">
              / {capacity} kg capacity
            </span>
          </p>
          <div
            className={`inline-flex items-center gap-1.5 mt-1.5 text-sm font-medium ${
              eligible ? "text-green-600" : "text-red-500"
            }`}
          >
            {eligible ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {eligible ? "Eligible for Dispatch" : "Over capacity"}
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mb-6" />

      <TripStateStepper currentStage={stage} />
    </div>
  );
}