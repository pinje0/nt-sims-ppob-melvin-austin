"use client";

import { Banknote } from "lucide-react";

export default function TopUpForm({ amount, onAmountChange, onQuickSelect, onSubmit, isDisabled }) {
  const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">Silahkan masukan</p>
        <h1 className="text-3xl font-semibold">Nominal Top Up</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input & Button */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Banknote className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="masukan nominal Top Up"
              value={amount ? formatCurrency(amount) : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                onAmountChange(value);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#f42619] transition-colors text-base"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={isDisabled}
            className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Top Up
          </button>
        </div>

        {/* Right Column - Quick Select Buttons */}
        <div className="grid grid-cols-3 gap-4">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => onQuickSelect(quickAmount)}
              className={`py-3 px-2 border-2 rounded font-medium transition-colors text-sm ${
                parseInt(amount) === quickAmount
                  ? "border-[#f42619] bg-red-50 text-[#f42619]"
                  : "border-gray-300 hover:border-gray-400 text-gray-700"
              }`}
            >
              Rp{formatCurrency(quickAmount)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
