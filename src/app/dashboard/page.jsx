"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import ProfileBalanceSection from "@/components/dashboard/ProfileBalanceSection";
import ServicesGrid from "@/components/dashboard/ServicesGrid";
import PromoBanner from "@/components/dashboard/PromoBanner";
import { fetchProfile, fetchBalance } from "@/store/slices/userSlice";
import { fetchServices, fetchBanners } from "@/store/slices/transactionSlice";
import toast from "react-hot-toast";

function DashboardContent() {
  const dispatch = useDispatch();
  const { loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchProfile()).unwrap(),
          dispatch(fetchBalance()).unwrap(),
          dispatch(fetchServices()).unwrap(),
          dispatch(fetchBanners()).unwrap(),
        ]);
      } catch (error) {
        toast.error(error || "Gagal memuat data");
      }
    };

    loadData();
  }, [dispatch]);

  if (userLoading) {
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
      <ServicesGrid />
      <PromoBanner />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
