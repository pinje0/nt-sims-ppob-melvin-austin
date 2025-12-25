"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validation";
import { authAPI } from "@/lib/auth";
import { useDispatch, useSelector } from "react-redux";
import { registerStart, registerSuccess, registerFailure } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(registerStart());

      // Hapus confirm_password sebelum kirim ke API
      const { confirm_password, ...registerData } = data;

      const response = await authAPI.register(registerData);

      // Cek response berdasarkan dokumentasi API
      if (response.data.status === 0) {
        dispatch(registerSuccess());
        toast.success(response.data.message || "Registrasi berhasil silahkan login");
        router.push("/login");
      } else {
        // Handle error dari API (status !== 0)
        dispatch(registerFailure(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle error dari network/axios
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat registrasi";
      dispatch(registerFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Lengkapi data untuk
          <br />
          membuat akun
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="email"
          placeholder="masukan email anda"
          icon="email"
          register={register("email")}
          error={errors.email?.message}
        />

        <Input
          type="text"
          placeholder="nama depan"
          icon="user"
          register={register("first_name")}
          error={errors.first_name?.message}
        />

        <Input
          type="text"
          placeholder="nama belakang"
          icon="user"
          register={register("last_name")}
          error={errors.last_name?.message}
        />

        <Input
          type="password"
          placeholder="buat password"
          icon="password"
          register={register("password")}
          error={errors.password?.message}
        />

        <Input
          type="password"
          placeholder="konfirmasi password"
          icon="password"
          register={register("confirm_password")}
          error={errors.confirm_password?.message}
        />

        <Button type="submit" loading={loading}>
          Registrasi
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          sudah punya akun? login{" "}
          <Link href="/login" className="text-[#f42619] font-semibold hover:underline">
            di sini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
