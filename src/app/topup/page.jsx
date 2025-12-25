"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import ProfileBalanceSection from "@/components/dashboard/ProfileBalanceSection";
import TopUpForm from "@/components/topup/TopUpForm";
import TopUpModal from "@/components/topup/TopUpModal";
import { api } from "@/lib/api";
import { fetchBalance } from "@/store/slices/userSlice";
import toast from "react-hot-toast";

function TopUpContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'confirm', 'success', 'failed'
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (value) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");
    setAmount(numericValue);
  };

  const handleQuickSelect = (value) => {
    setAmount(value.toString());
  };

  const handleSubmit = () => {
    const numAmount = parseInt(amount);

    // Validation
    if (!amount || numAmount < 10000) {
      toast.error("Minimum top up adalah Rp 10.000");
      return;
    }
    if (numAmount > 1000000) {
      toast.error("Maksimum top up adalah Rp 1.000.000");
      return;
    }

    // Show confirmation modal
    setModalType("confirm");
    setShowModal(true);
  };

  const handleConfirmTopUp = async () => {
    setLoading(true);
    try {
      const response = await api.post("/topup", {
        top_up_amount: parseInt(amount),
      });

      if (response.data.status === 0) {
        // Success
        setModalType("success");
        // Refresh balance
        await dispatch(fetchBalance()).unwrap();
      } else {
        setModalType("failed");
      }
    } catch (error) {
      console.error("Top up error:", error);
      setModalType("failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === "success") {
      // Reset form and redirect to dashboard
      setAmount("");
      router.push("/dashboard");
    }
  };

  const isButtonDisabled = !amount || parseInt(amount) < 10000 || parseInt(amount) > 1000000;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileBalanceSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopUpForm
          amount={amount}
          onAmountChange={handleAmountChange}
          onQuickSelect={handleQuickSelect}
          onSubmit={handleSubmit}
          isDisabled={isButtonDisabled}
        />
      </div>

      {showModal && (
        <TopUpModal
          type={modalType}
          amount={parseInt(amount)}
          onConfirm={handleConfirmTopUp}
          onClose={handleCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
}

export default function TopUpPage() {
  return (
    <ProtectedRoute>
      <TopUpContent />
    </ProtectedRoute>
  );
}
