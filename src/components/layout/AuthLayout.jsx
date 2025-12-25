import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Image src="/img/Logo.png" alt="SIMS PPOB Logo" width={32} height={32} />
            <span className="text-xl font-semibold">SIMS PPOB</span>
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/img/illustrasi-login.png"
          alt="Auth Banner"
          fill
          priority
          className="object-contain object-right"
        />
      </div>
    </div>
  );
}
