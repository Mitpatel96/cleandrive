import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Loader2, RefreshCw, Mail, Phone, MapPin, Car, LogOut } from "lucide-react";
import { fetchEnquiries, fetchMe, clearToken, getToken } from "../lib/authApi";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const [me, data] = await Promise.all([fetchMe(), fetchEnquiries()]);
      setEmail(me.email);
      setItems(data);
    } catch (e) {
      if (e?.response?.status === 401) {
        clearToken();
        navigate("/admin/login", { replace: true });
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    load();
  }, []);

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div data-testid="admin-page" className="min-h-screen bg-cloud">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono-label text-brand">CleanDrive Admin</div>
            <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Enquiries {items.length ? `(${items.length})` : ""}
            </h1>
            {email && (
              <div className="mt-1 text-sm text-slate-500">
                Signed in as <span className="font-semibold text-navy">{email}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={load}
              data-testid="admin-refresh-button"
              variant="outline"
              className="rounded-full border-slate-300 text-navy hover:bg-white"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span className="ml-2">Refresh</span>
            </Button>
            <Button
              onClick={logout}
              data-testid="admin-logout-button"
              className="rounded-full bg-navy text-white hover:bg-black"
            >
              <LogOut size={16} />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-slate-500">
              <Loader2 className="mr-2 animate-spin" /> Loading enquiries...
            </div>
          ) : items.length === 0 ? (
            <div
              data-testid="admin-empty"
              className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500"
            >
              No enquiries yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  data-testid={`enquiry-card-${it.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-heading text-lg font-bold text-navy">
                        {it.full_name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(it.created_at).toLocaleString()}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        it.email_sent
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {it.email_sent ? "Notified" : "Saved"}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <Phone size={14} className="text-brand" /> {it.phone}
                    </li>
                    {it.email && (
                      <li className="flex items-center gap-2">
                        <Mail size={14} className="text-brand" /> {it.email}
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5 text-brand" /> {it.address}
                    </li>
                    <li className="flex items-center gap-2">
                      <Car size={14} className="text-brand" /> {it.car_type} ·{" "}
                      {it.preferred_time_slot}
                    </li>
                  </ul>

                  <div className="mt-4 rounded-lg bg-cloud p-3 text-sm">
                    <div className="font-mono-label text-slate-500">Plan</div>
                    <div className="mt-1 font-semibold text-navy">
                      {it.preferred_plan}
                    </div>
                  </div>
                  {it.message && (
                    <div className="mt-3 text-sm text-slate-600">
                      <span className="font-semibold text-navy">Notes: </span>
                      {it.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
