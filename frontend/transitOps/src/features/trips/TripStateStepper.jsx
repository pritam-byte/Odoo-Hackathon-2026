import { FileText, Truck, CheckCircle2 } from "lucide-react";

const stages = [
  { key: "draft", label: "Draft", desc: "Trip is being created", icon: FileText },
  { key: "dispatched", label: "Dispatched", desc: "Trip is dispatched to driver", icon: Truck },
  { key: "completed", label: "Completed", desc: "Trip is completed", icon: CheckCircle2 },
];

export default function TripStateStepper({ currentStage = "draft" }) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-4">Trip State</h3>
      <div>
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === currentIndex;
          const isDone = i < currentIndex;
          const isLast = i === stages.length - 1;

          return (
            <div key={stage.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    isActive || isDone
                      ? "border-green-500 text-green-600"
                      : "border-slate-300 text-slate-400"
                  }`}
                >
                  <Icon size={18} />
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-[36px] ${
                      isDone ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
              <div className="pb-9">
                <p
                  className={`font-semibold ${
                    isActive || isDone ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {stage.label}
                </p>
                <p className="text-sm text-slate-500">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}