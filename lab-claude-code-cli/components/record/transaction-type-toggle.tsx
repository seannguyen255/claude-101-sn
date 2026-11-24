import type { TransactionType } from "@/components/record/types";

type Props = {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
};

const OPTIONS: { value: TransactionType; label: string; active: string }[] = [
  { value: "income", label: "Income", active: "bg-green-600 text-white" },
  { value: "expense", label: "Expense", active: "bg-red-600 text-white" },
];

export function TransactionTypeToggle({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Loại giao dịch"
      className="grid grid-cols-2 gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800"
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              selected ? option.active : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
