import type { Account } from "@/components/record/types";

type Props = {
  accounts: Account[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function AccountSelect({ accounts, value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="account" className="text-sm font-medium">
        Tài khoản
      </label>
      <select
        id="account"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-blue-600 dark:border-zinc-700 dark:bg-zinc-950"
      >
        <option value="">Chọn tài khoản</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
