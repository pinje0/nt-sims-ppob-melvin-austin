import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email("Format email tidak valid").required("Email harus diisi"),
  first_name: yup.string().required("Nama depan harus diisi"),
  last_name: yup.string().required("Nama belakang harus diisi"),
  password: yup.string().min(8, "Password minimal 8 karakter").required("Password harus diisi"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Format email tidak valid").required("Email harus diisi"),
  password: yup.string().min(8, "Password minimal 8 karakter").required("Password harus diisi"),
});

export const topUpSchema = yup.object({
  top_up_amount: yup
    .number()
    .min(10000, "Nominal top up minimal Rp 10.000")
    .max(1000000, "Nominal top up maksimal Rp 1.000.000")
    .required("Nominal harus diisi"),
});

export const profileSchema = yup.object({
  first_name: yup.string().required("Nama depan harus diisi"),
  last_name: yup.string().required("Nama belakang harus diisi"),
});
