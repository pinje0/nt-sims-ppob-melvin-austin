"use client";

import { Plus, Minus } from "lucide-react";

export default function TransactionList({ transactions, loading, hasMore, onShowMore }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#f42619] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Belum ada transaksi</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div
          key={`${transaction.invoice_number}-${index}`}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {transaction.transaction_type === "TOPUP" ? (
                  <div className="flex items-center text-green-600">
                    <Plus className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(transaction.total_amount)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <Minus className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {formatCurrency(transaction.total_amount)}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-1">{formatDate(transaction.created_on)}</p>
              <p className="text-sm text-gray-700">{transaction.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {transaction.transaction_type === "TOPUP"
                  ? "Top Up Saldo"
                  : transaction.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onShowMore}
            disabled={loading}
            className="text-[#f42619] font-semibold hover:underline disabled:opacity-50"
          >
            {loading ? "Loading..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}
