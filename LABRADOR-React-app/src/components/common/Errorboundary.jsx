import { Link } from "react-router-dom";

function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cream)] p-6">
      {/* Main Content Card */}
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[var(--border-color)] relative overflow-hidden">
        
        {/* Subtle Background Accent (The "Anemo" Pulse) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--anemo-glow)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--primary-teal)] opacity-10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Big Header Number */}
          <h1 className="text-9xl font-black text-[var(--primary-teal)] tracking-tighter drop-shadow-sm italic">
            404
          </h1>
          
          {/* Decorative Divider */}
          <div className="flex justify-center items-center gap-2 my-4">
            <div className="h-[2px] w-12 bg-[var(--accent-gold)] rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] rotate-45" />
            <div className="h-[2px] w-12 bg-[var(--accent-gold)] rounded-full" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--lyre-brown)] font-serif">
            Lost in the Wind?
          </h2>
          
          <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
            The page you are looking for has been carried away by the breeze. 
            Let's get you back to safety.
          </p>

          <div className="mt-10">
            <Link 
              to="/" 
              className="inline-flex items-center px-8 py-4 bg-[var(--primary-teal)] text-white font-bold rounded-2xl 
                         transition-all duration-300 hover:bg-[var(--secondary-green)] hover:scale-105 
                         hover:shadow-[0_0_20px_var(--anemo-glow)] active:scale-95 group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;