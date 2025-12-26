"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import ProfileForm from "@/components/account/ProfileForm";
import { api } from "@/lib/api";
import { fetchProfile, clearUser } from "@/store/slices/userSlice";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import { sanitizePlainText } from "@/utils/sanitizeText";

function AccountContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
  });

  const hasValidProfileImage =
    profile.profile_image &&
    profile.profile_image !== "null" &&
    profile.profile_image !== "" &&
    typeof profile.profile_image === "string" &&
    profile.profile_image.startsWith("http") &&
    !profile.profile_image.includes("/null");

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
    });
  };

  const nameRegex = /^[a-zA-Z\s]{2,50}$/;

  const handleSaveProfile = async () => {
    const cleanFirstName = sanitizePlainText(formData.first_name);
    const cleanLastName = sanitizePlainText(formData.last_name);

    if (!nameRegex.test(cleanFirstName)) {
      toast.error("Nama depan hanya boleh huruf dan spasi (2–50 karakter)");
      return;
    }

    if (!nameRegex.test(cleanLastName)) {
      toast.error("Nama belakang hanya boleh huruf dan spasi (2–50 karakter)");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put("/profile/update", {
        first_name: cleanFirstName,
        last_name: cleanLastName,
      });

      if (response.data.status === 0) {
        toast.success("Profile berhasil diupdate");
        await dispatch(fetchProfile()).unwrap();
        setIsEditing(false);
      } else {
        toast.error(response.data.message || "Gagal update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      toast.error("Format image harus jpeg atau png");
      return;
    }

    // Validate file size (max 100kb)
    if (file.size > 100 * 1024) {
      toast.error("Ukuran file maksimal 100kb");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.put("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 0) {
        toast.success("Profile picture berhasil diupdate");
        await dispatch(fetchProfile()).unwrap();
      } else {
        toast.error(response.data.message || "Gagal upload image");
      }
    } catch (error) {
      console.error("Upload image error:", error);
      toast.error(error.response?.data?.message || "Gagal upload image");
    } finally {
      setUploadingImage(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleLogout = () => {
    // Clear token
    localStorage.removeItem("token");

    // Clear Redux state
    dispatch(logout());
    dispatch(clearUser());

    // Redirect to login
    toast.success("Logout berhasil");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4 group">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200">
              <Image
                src={hasValidProfileImage ? profile.profile_image : "/img/profile-photo.png"}
                alt="Profile"
                fill
                sizes="128px"
                className="object-cover"
                unoptimized={hasValidProfileImage}
              />
            </div>

            {/* Edit Icon Overlay */}
            <button
              onClick={handleImageClick}
              disabled={uploadingImage}
              className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploadingImage ? (
                <div className="w-5 h-5 border-2 border-[#f42619] border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-lg">✏️</span>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <h1 className="text-3xl font-semibold">
            {profile.first_name} {profile.last_name}
          </h1>
        </div>

        {/* Profile Form */}
        <ProfileForm
          formData={formData}
          isEditing={isEditing}
          loading={loading}
          onFormDataChange={setFormData}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveProfile}
          onCancelClick={handleCancelEdit}
          onLogoutClick={handleLogout}
          email={profile.email}
        />
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}
