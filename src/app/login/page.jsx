"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validation";
import { authAPI } from "@/lib/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());

      const response = await authAPI.login(data);

      // Check Response API
      if (response.data.status === 0) {
        const token = response.data.data.token;

        // Store JWT on LocalStorage
        localStorage.setItem("token", token);

        dispatch(loginSuccess({ token }));
        toast.success(response.data.message || "Login Sukses");
        router.push("/dashboard");
      } else {
        // Handle error dari API (status !== 0)
        dispatch(loginFailure(response.data.message));
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle error dari network/axios
      // Status 401 = Username atau password salah
      // Status 400 = Parameter email tidak sesuai format
      const errorMessage = error.response?.data?.message || "Username atau password salah";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Masuk atau buat akun
          <br />
          untuk memulai
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
          type="password"
          placeholder="masukan password anda"
          icon="password"
          register={register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" loading={loading}>
          Masuk
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          belum punya akun? registrasi{" "}
          <Link href="/register" className="text-[#f42619] font-semibold hover:underline">
            di sini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
