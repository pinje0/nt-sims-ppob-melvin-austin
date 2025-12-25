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
import { fetchServices } from "@/store/slices/transactionSlice";
import toast from "react-hot-toast";

function PaymentContent() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.transaction);

  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Fetch services if not loaded
  useEffect(() => {
    const loadServices = async () => {
      if (!services || services.length === 0) {
        try {
          await dispatch(fetchServices()).unwrap();
        } catch (error) {
          console.error("Failed to load services:", error);
        }
      }
      setIsLoadingServices(false);
    };

    loadServices();
  }, [dispatch, services]);

  // Find service after services are loaded
  useEffect(() => {
    if (isLoadingServices) return; // Wait for services to load

    const service = services.find((s) => s.service_code === params.service_code);

    if (service) {
      setSelectedService(service);
    } else {
      // Only redirect if services are loaded but service not found
      toast.error("Service tidak ditemukan");
      router.push("/dashboard");
    }
  }, [params.service_code, services, router, isLoadingServices]);

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
        await dispatch(fetchBalance()).unwrap();
      } else {
        setModalType("failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setModalType("failed");

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
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

  // Show loading while fetching services or finding service
  if (isLoadingServices || !selectedService) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 64px)" }}>
          <div className="w-12 h-12 border-4 border-[#f42619] border-t-transparent rounded-full animate-spin" />
        </div>
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
