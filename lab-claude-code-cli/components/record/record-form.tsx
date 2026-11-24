"use client";

import { useState } from "react";
import { AccountSelect } from "@/components/record/account-select";
import { AmountInput } from "@/components/record/amount-input";
import { TransactionTypeToggle } from "@/components/record/transaction-type-toggle";
import type { Account, TransactionType } from "@/components/record/types";

// Tạm thời hard-code; sẽ lấy từ database khi có API.
const ACCOUNTS: Account[] = [
  { id: "cash", name: "Tiền mặt" },
  { id: "bank", name: "Ngân hàng" },
  { id: "e-wallet", name: "Ví điện tử" },
];

export function RecordForm() {
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [errors, setErrors] = useState<{ amount?: string; account?: string }>(
    {},
  );

  function handleClear() {
    setType("expense");
    setAmount("");
    setAccountId("");
    setErrors({});
  }

  function handleSave() {
    const next: typeof errors = {};
    if (!(Number(amount) > 0)) next.amount = "Nhập số tiền lớn hơn 0";
    if (!accountId) next.account = "Vui lòng chọn tài khoản";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: gọi API lưu giao dịch khi backend sẵn sàng.
    handleClear();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="mx-auto flex w-full max-w-md flex-col gap-5 p-4"
    >
      <TransactionTypeToggle value={type} onChange={setType} />
      <AmountInput
        value={amount}
        onChange={setAmount}
        type={type}
        error={errors.amount}
      />
      <AccountSelect
        accounts={ACCOUNTS}
        value={accountId}
        onChange={setAccountId}
        error={errors.account}
      />
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-zinc-300 py-2.5 font-medium dark:border-zinc-700"
        >
          Clear
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-2.5 font-medium text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
