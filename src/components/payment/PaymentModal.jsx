"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export default function PaymentModal({ type, service, onConfirm, onClose, loading }) {
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
              <div className="relative w-16 h-16 bg-white rounded-full border-2 border-gray-200 overflow-hidden">
                {service.service_icon && (
                  <Image
                    src={service.service_icon}
                    alt={service.service_name}
                    fill
                    sizes="64px"
                    className="object-cover p-2"
                    unoptimized
                  />
                )}
              </div>
            </div>
            <p className="text-center text-gray-700 mb-2">Beli {service.service_name} senilai</p>
            <p className="text-center text-2xl font-bold mb-6">
              {formatCurrency(service.service_tariff)} ?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                disabled={loading}
                className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Ya, lanjutkan Bayar"}
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
            <p className="text-center text-gray-700 mb-2">
              Pembayaran {service.service_name} sebesar
            </p>
            <p className="text-center text-2xl font-bold mb-2">
              {formatCurrency(service.service_tariff)}
            </p>
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
            <p className="text-center text-gray-700 mb-2">
              Pembayaran {service.service_name} sebesar
            </p>
            <p className="text-center text-2xl font-bold mb-2">
              {formatCurrency(service.service_tariff)}
            </p>
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
