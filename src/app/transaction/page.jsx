"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import ProfileBalanceSection from "@/components/dashboard/ProfileBalanceSection";
import TransactionList from "@/components/transaction/TransactionList";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

function TransactionContent() {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const fetchTransactions = async (currentOffset = 0, append = false) => {
    try {
      setLoading(true);
      const response = await api.get("/transaction/history", {
        params: {
          offset: currentOffset,
          limit: limit,
        },
      });

      if (response.data.status === 0) {
        const newRecords = response.data.data.records;

        if (append) {
          setTransactions((prev) => [...prev, ...newRecords]);
        } else {
          setTransactions(newRecords);
        }

        // Check if there's more data
        if (newRecords.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Fetch transactions error:", error);
      toast.error("Gagal memuat riwayat transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(0);
  }, []);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchTransactions(newOffset, true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileBalanceSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-6">Semua Transaksi</h2>

        <TransactionList
          transactions={transactions}
          loading={loading}
          hasMore={hasMore}
          onShowMore={handleShowMore}
        />
      </div>
    </div>
  );
}

export default function TransactionPage() {
  return (
    <ProtectedRoute>
      <TransactionContent />
    </ProtectedRoute>
  );
}
