"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import ProfileBalanceSection from "@/components/dashboard/ProfileBalanceSection";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentModal from "@/components/payment/PaymentModal";
import { api } from "@/lib/api";
import { fetchBalance } from "@/store/slices/userSlice";
import toast from "react-hot-toast";

function PaymentContent() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.transaction);

  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'confirm', 'success', 'failed'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Find service by service_code from URL params
    const service = services.find((s) => s.service_code === params.service_code);
    if (service) {
      setSelectedService(service);
    } else {
      // If service not found, redirect to dashboard
      toast.error("Service tidak ditemukan");
      router.push("/dashboard");
    }
  }, [params.service_code, services, router]);

  const handleSubmit = () => {
    setModalType("confirm");
    setShowModal(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const response = await api.post("/transaction", {
        service_code: selectedService.service_code,
      });

      if (response.data.status === 0) {
        setModalType("success");
        // Refresh balance
        await dispatch(fetchBalance()).unwrap();
      } else {
        setModalType("failed");
      }
    } catch (error) {
      // Suppress console error for expected errors (400, 401)
      if (error.response?.status !== 400 && error.response?.status !== 401) {
        console.error("Payment error:", error);
      }

      setModalType("failed");

      const errorMessage = error.response?.data?.message || "Pembayaran gagal";
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === "success" || modalType === "failed") {
      router.push("/dashboard");
    }
  };

  if (!selectedService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#f42619] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileBalanceSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaymentForm service={selectedService} onSubmit={handleSubmit} />
      </div>

      {showModal && (
        <PaymentModal
          type={modalType}
          service={selectedService}
          onConfirm={handleConfirmPayment}
          onClose={handleCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <PaymentContent />
    </ProtectedRoute>
  );
}
