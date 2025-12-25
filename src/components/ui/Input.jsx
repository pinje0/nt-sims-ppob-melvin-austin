import { AtSign, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({
  type = "text",
  placeholder,
  icon,
  error,
  register,
  name,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const getIcon = () => {
    switch (icon) {
      case "email":
        return <AtSign className="w-5 h-5 text-gray-400" />;
      case "password":
        return <Lock className="w-5 h-5 text-gray-400" />;
      case "user":
        return <User className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{getIcon()}</div>}
        <input
          type={inputType}
          placeholder={placeholder}
          className={`input-field ${icon ? "pl-10" : ""} ${isPasswordField ? "pr-10" : ""} ${
            error ? "input-error" : ""
          }`}
          {...register}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
