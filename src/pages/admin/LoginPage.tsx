import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DevBackground, DevCursor } from "@/components/common";
import { Header, Footer } from "@/components/layout";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const result = await login(username, password);
    if (!result.success) {
      setError(typeof result.error === 'string' ? result.error : "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="dev-cursor min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4 pt-24">
        <DevCursor />
        <DevBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="border border-green-400/30 bg-black/70 backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-green-400/30">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-green-400 text-xs font-mono">~/admin/login</span>
          </div>

          {/* Form */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white font-mono mb-2">
              <span className="text-green-400">&lt;</span>admin<span className="text-green-400">/&gt;</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm mb-6">
              <span className="text-green-400">// </span>Authentication required
            </p>

            {error && (
              <div className="mb-4 p-3 border border-red-400/30 bg-red-400/10 text-red-400 font-mono text-sm">
                <span className="text-red-400">Error: </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  <span className="text-cyan-400">$</span> username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-green-400/30 text-white font-mono px-4 py-3 focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="Enter username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-green-400 font-mono text-sm mb-2">
                  <span className="text-cyan-400">$</span> password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-green-400/30 text-white font-mono px-4 py-3 focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="Enter password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-8 py-4 border-2 border-green-400 text-green-400 font-mono font-bold hover:bg-green-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "AUTHENTICATING..." : "LOGIN()"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-green-400/30">
              <p className="text-gray-500 font-mono text-xs text-center">
                <span className="text-green-400">// </span>Protected area - Authorized access only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default LoginPage;
