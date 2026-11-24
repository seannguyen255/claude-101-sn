import type { TransactionType } from "@/components/record/types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  type: TransactionType;
  error?: string;
};

export function AmountInput({ value, onChange, type, error }: Props) {
  const color = type === "income" ? "text-green-600" : "text-red-600";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="amount" className="text-sm font-medium">
        Số tiền
      </label>
      <input
        id="amount"
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-2xl font-semibold outline-none focus:border-blue-600 dark:border-zinc-700 ${color}`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
