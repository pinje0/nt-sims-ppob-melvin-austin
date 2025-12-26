"use client";

import { CheckCircle2, XCircle, Wallet } from "lucide-react";

export default function TopUpModal({ type, amount, onConfirm, onClose, loading }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderContent = () => {
    switch (type) {
      case "confirm":
        return (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#f42619] rounded-full flex items-center justify-center">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-center text-gray-700 mb-2">Anda yakin untuk Top Up sebesar</p>
            <p className="text-center text-2xl font-bold mb-6">{formatCurrency(amount)} ?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                disabled={loading}
                className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Ya, lanjutkan Top Up"}
              </button>
              <button
                onClick={onClose}
                disabled={loading}
                className="w-full text-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors"
              >
                Batalkan
              </button>
            </div>
          </>
        );

      case "success":
        return (
          <>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-center text-gray-700 mb-2">Top Up sebesar</p>
            <p className="text-center text-2xl font-bold mb-2">{formatCurrency(amount)}</p>
            <p className="text-center text-gray-700 mb-6">berhasil!</p>
            <button
              onClick={onClose}
              className="w-full text-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </>
        );

      case "failed":
        return (
          <>
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-[#f42619]" />
            </div>
            <p className="text-center text-gray-700 mb-2">Top Up sebesar</p>
            <p className="text-center text-2xl font-bold mb-2">{formatCurrency(amount)}</p>
            <p className="text-center text-gray-700 mb-6">gagal</p>
            <button
              onClick={onClose}
              className="w-full text-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl">{renderContent()}</div>
    </div>
  );
}
