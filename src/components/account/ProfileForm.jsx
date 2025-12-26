"use client";

import { AtSign, User } from "lucide-react";

export default function ProfileForm({
  formData,
  isEditing,
  loading,
  onFormDataChange,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onLogoutClick,
  email,
}) {
  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Email Field - Always Readonly */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <AtSign className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* First Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            readOnly={!isEditing}
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded transition-colors ${
              isEditing
                ? "bg-white text-gray-900 focus:outline-none focus:border-[#f42619]"
                : "bg-gray-50 text-gray-700 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      {/* Last Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
            readOnly={!isEditing}
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded transition-colors ${
              isEditing
                ? "bg-white text-gray-900 focus:outline-none focus:border-[#f42619]"
                : "bg-gray-50 text-gray-700 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        {!isEditing ? (
          <>
            <button
              onClick={onEditClick}
              className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Edit Profil
            </button>
            <button
              onClick={onLogoutClick}
              className="w-full bg-white text-[#f42619] border-2 border-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSaveClick}
              disabled={loading}
              className="w-full bg-[#f42619] text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              onClick={onCancelClick}
              disabled={loading}
              className="w-full bg-white text-[#f42619] border-2 border-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Batalkan
            </button>
          </>
        )}
      </div>
    </div>
  );
}
