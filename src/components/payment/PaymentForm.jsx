"use client";

import Image from "next/image";
import { Zap } from "lucide-react";

export default function PaymentForm({ service, onSubmit }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">PemBayaran</p>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            {service.service_icon && (
              <Image
                src={service.service_icon}
                alt={service.service_name}
                fill
                sizes="32px"
                className="object-cover"
                unoptimized
              />
            )}
          </div>
          <h1 className="text-2xl font-semibold">{service.service_name}</h1>
        </div>
      </div>

      {/* Single Column - Full Width */}
      <div className="w-full">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Zap className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formatCurrency(service.service_tariff)}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed text-base"
            />
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
