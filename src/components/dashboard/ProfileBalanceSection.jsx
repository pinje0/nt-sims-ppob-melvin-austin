"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleBalanceVisibility } from "@/store/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function ProfileBalanceSection() {
  const dispatch = useDispatch();
  const { profile, balance, showBalance } = useSelector((state) => state.user);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Debug: Log profile data
  // console.log("Profile data:", profile);
  // console.log("Profile image:", profile.profile_image);

  // Check if profile_image is valid URL
  const hasValidProfileImage =
    profile.profile_image &&
    profile.profile_image !== "null" &&
    profile.profile_image !== "" &&
    typeof profile.profile_image === "string" &&
    profile.profile_image.startsWith("http") &&
    !profile.profile_image.includes("/null"); // ← FIX: Check if URL contains "/null"

  const profileImageSrc = hasValidProfileImage ? profile.profile_image : "/img/profile-photo.png";

  // console.log("Using profile image:", profileImageSrc);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Section */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={profileImageSrc}
                alt="Profile"
                fill
                sizes="64px"
                className="object-cover"
                unoptimized={hasValidProfileImage}
                onError={(e) => {
                  console.error("Image failed to load:", profileImageSrc);
                  e.currentTarget.src = "/img/profile-photo.png";
                }}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Selamat datang,</p>
              <h2 className="text-2xl font-semibold">
                {profile.first_name} {profile.last_name}
              </h2>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[161px]">
          {/* Background Image */}
          <Image
            src="/img/background-saldo.png"
            alt="Background Saldo"
            fill
            sizes="(max-width: 768px) 100vw, 670px"
            className="object-cover"
            priority
          />

          {/* Content Overlay */}
          <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between">
            <div>
              <p className="text-sm mb-2">Saldo anda</p>
              <h3 className="text-3xl font-bold">
                {showBalance ? formatCurrency(balance) : "Rp ••••••••"}
              </h3>
            </div>
            <button
              onClick={() => dispatch(toggleBalanceVisibility())}
              className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity w-fit"
            >
              <span>Lihat Saldo</span>
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
