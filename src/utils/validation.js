import * as yup from "yup";
import sanitizeHtml from "sanitize-html";

// Sanitize config - remove all HTML
const sanitizeConfig = {
  allowedTags: [], // No HTML tags allowed
  allowedAttributes: {}, // No attributes allowed
  textFilter: (text) => {
    // Additional text cleaning
    return text.trim().slice(0, 100); // Limit length
  },
};

// Transform function using sanitize-html
const sanitizeTransform = (value) => {
  if (typeof value !== "string") return value;
  return sanitizeHtml(value, sanitizeConfig);
};

export const registerSchema = yup.object({
  email: yup
    .string()
    .transform(sanitizeTransform)
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  first_name: yup
    .string()
    .transform(sanitizeTransform)
    .required("Nama depan harus diisi")
    .min(2, "Nama depan minimal 2 karakter")
    .max(50, "Nama depan maksimal 50 karakter")
    .matches(/^[a-zA-Z\s]*$/, "Nama depan hanya boleh huruf dan spasi"),
  last_name: yup
    .string()
    .transform(sanitizeTransform)
    .required("Nama belakang harus diisi")
    .min(2, "Nama belakang minimal 2 karakter")
    .max(50, "Nama belakang maksimal 50 karakter")
    .matches(/^[a-zA-Z\s]*$/, "Nama belakang hanya boleh huruf dan spasi"),
  password: yup.string().min(8, "Password minimal 8 karakter").required("Password harus diisi"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .transform(sanitizeTransform)
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: yup.string().min(8, "Password minimal 8 karakter").required("Password harus diisi"),
});

export const profileSchema = yup.object({
  first_name: yup
    .string()
    .transform(sanitizeTransform)
    .required("Nama depan harus diisi")
    .min(2, "Nama depan minimal 2 karakter")
    .max(50, "Nama depan maksimal 50 karakter")
    .matches(/^[a-zA-Z\s]*$/, "Nama depan hanya boleh huruf dan spasi"),
  last_name: yup
    .string()
    .transform(sanitizeTransform)
    .required("Nama belakang harus diisi")
    .min(2, "Nama belakang minimal 2 karakter")
    .max(50, "Nama belakang maksimal 50 karakter")
    .matches(/^[a-zA-Z\s]*$/, "Nama belakang hanya boleh huruf dan spasi"),
});

export const topUpSchema = yup.object({
  top_up_amount: yup
    .number()
    .min(10000, "Nominal top up minimal Rp 10.000")
    .max(1000000, "Nominal top up maksimal Rp 1.000.000")
    .required("Nominal harus diisi"),
});
