import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface UserType {
  name?: string;
  email?: string;
}

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export function SignInModal({
  isOpen,
  onClose,
  user,
  setUser,
}: SignInModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // LOGIN
      if (!isSignUp) {
        const res = await axios.post("/api/users/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);

        setUser(res.data);

        onClose();
        navigate("/");
      }

      // SIGNUP
      else {
        const res = await axios.post("/api/users/register", {
          name,
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);

        setUser(res.data);

        onClose();
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);

    onClose();

    // navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-900 rounded-lg w-full max-w-md p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
            >
              <X className="size-6" />
            </button>

            {user ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-red-600/20 p-4 rounded-full">
                    <User className="size-10 text-red-500" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h2>

                <p className="text-zinc-300 text-lg">
                  {user.username || "User"}
                </p>

                <p className="text-zinc-500 text-sm mb-8">
                  {user.email}
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
                >
                  <LogOut className="size-5" />
                  Logout
                </button>
              </div>
            ) : (
              <>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </h2>

                {error && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Password
                    </label>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {loading
                      ? "Please wait..."
                      : isSignUp
                      ? "Create Account"
                      : "Sign In"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-zinc-400 text-sm">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-red-600 hover:text-red-500 font-semibold"
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}