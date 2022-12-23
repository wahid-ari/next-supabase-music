import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import useToast from "@utils/useToast";
import Button from "@components/systems/Button";
import Heading from "@components/systems/Heading";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Prefetch the dashboard page
    Router.prefetch('/')
  }, [])

  async function handleLogin(e) {
    e.preventDefault();
    let isError = false
    if (!form.username) {
      isError = true
      pushToast({ message: "Username tidak boleh kosong", isError: true });
    }
    if (!form.password) {
      isError = true
      pushToast({ message: "Password tidak boleh kosong", isError: true });
    }

    // jika tidak ada error save data
    if (!isError) {
      const toastId = pushToast({
        message: "Login Admin...",
        isLoading: true,
      });
      try {
        updateToast({
          toastId,
          message: "Berhasil Login Admin",
          isError: false,
        });
        Router.replace("/");
      } catch (error) {
        updateToast({
          toastId,
          message: "Gagal login, periksa Username dan Password !",
          isError: true,
        });
        updateToast({
          toastId,
          message: error.response.data.message,
          isError: true,
        });
        console.error(error);
      }
    }
  }

  return (
    <div className="text-sm font-medium">

      <Head>
        <title>Login Admin | Music</title>
      </Head>

      <div
        className="min-h-screen w-screen sm:grid"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <div className="sm:hidden banner p-8 flex flex-col justify-between gap-2">
          <div>
            <h1 className="text-white font-bold text-4xl">Music</h1>
          </div>
          <p className="text-white font-bold">2022</p>
        </div>
        <div className="w-full px-8 md:px-16 py-12">
          <div className="w-full sm:max-w-md">
            <Heading h1 className="font-semibold !text-neutral-800 mb-6">
              Login Admin
            </Heading>
            <div className="mb-5">
              <label className="text-sm block text-gray-800" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="text-sm transition-all font-medium bg-white w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 focus:ring-blue-800 border-gray-300 focus:border-blue-800 outline-none"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-5">
              <label className="text-sm block text-gray-800" htmlFor="password">
                Password
              </label>
              <div className="relative flex mb-4 items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="text-sm transition-all font-medium bg-white w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 focus:ring-blue-800 border-gray-300 focus:border-blue-800 outline-none"
                  autoComplete="off"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="z-10 mr-0.5 p-1.5 mt-2 rounded-md absolute right-0 backdrop-blur-lg"
                >
                  {showPassword ?
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                    :
                    <EyeOffIcon className="w-5 h-5 text-gray-600" />
                  }
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full">Login Admin</Button>
          </div>
        </div>
        <div className="hidden sm:flex banner px-8 py-12 flex-col justify-between gap-2">
          <div>
            <h1 className="text-white font-bold sm:text-5xl md:text-6xl">
              Music
            </h1>
            <br />
            <p className="text-white">
              Lorem aute ad laborum consequat qui mollit minim. Ullamco in
              incididunt et minim cupidatat ullamco dolore.
            </p>
          </div>
          <p className="text-white font-bold">2022</p>
        </div>
      </div>
      
    </div>
  );
}
