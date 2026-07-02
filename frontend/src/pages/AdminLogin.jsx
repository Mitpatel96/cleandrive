import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { login, getToken } from "../lib/authApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (getToken()) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-navy p-12 lg:flex lg:flex-col lg:justify-between">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-white/10">
            <img src="/cleandrive-logo-white.png" alt="CleanDrive" className="h-6 w-auto" />
          </span>
          <div>
            <div className="font-heading text-xl font-bold text-white">CleanDrive</div>
            <div className="text-[10px] tracking-[0.3em] text-[#38BDF8]">SHINE ON SCHEDULE</div>
          </div>
        </a>
        <div>
          <div className="font-mono-label text-[#38BDF8]">Admin Console</div>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-white">
            Every enquiry,<br/>one clean dashboard.
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            Sign in to see all your incoming customer enquiries in real time.
          </p>
        </div>
        <div className="text-sm text-white/40">© {new Date().getFullYear()} CleanDrive · Surat</div>
      </div>

      <div className="flex items-center justify-center bg-cloud p-6">
        <form
          onSubmit={submit}
          data-testid="admin-login-form"
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <a href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-navy">
            <ArrowLeft size={14} /> Back to site
          </a>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
            <Lock size={20} />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-navy">
            Admin sign in
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to access the dashboard.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-navy">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="admin-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="mt-2 h-11 rounded-md border-slate-300"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-navy">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="admin-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 h-11 rounded-md border-slate-300"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            data-testid="admin-login-submit"
            className="mt-6 h-11 w-full rounded-full bg-brand text-white hover:bg-[#0052CC] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={16} /> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="mt-4 text-xs text-slate-500">
            Only authorised CleanDrive administrators can access this area.
          </p>
        </form>
      </div>
    </div>
  );
}
