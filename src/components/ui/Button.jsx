export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  const variants = {
    primary: "btn-primary",
    secondary:
      "w-full bg-white text-[#f42619] border-2 border-[#f42619] py-3 rounded font-semibold hover:bg-red-50 transition-colors",
    outline:
      "w-full bg-transparent border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50 transition-colors",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
