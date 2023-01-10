import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import useToast from "@utils/useToast";
import Button from "@components/systems/Button";
import Heading from "@components/systems/Heading";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import nookies from "nookies";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    Router.prefetch('/')
  }, [])

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)
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
        const res = await axios.post(`${process.env.API_ROUTE}/api/login`, form)
        if (res.status == 200) {
          nookies.set(null, 'username', res.data.username, { path: '/' })
          nookies.set(null, 'name', res.data.name, { path: '/' })
          nookies.set(null, 'token', res.data.token, { path: '/' })
          updateToast({
            toastId,
            message: "Success Login",
            isError: false,
          });
          Router.replace("/");
        }
      } catch (error) {
        updateToast({ toastId, message: error.response.data.error, isError: true });
        console.error(error);
      }
    }
    setLoading(false)
  }

  return (
    <div className="text-sm font-medium dark:bg-white">

      <Head>
        <title>Login - Music</title>
      </Head>

      <div className="min-h-screen w-screen sm:grid sm:grid-cols-2">
        <div className="sm:hidden banner p-8 flex flex-col justify-between gap-2">
          <div>
            <h1 className="text-white font-bold text-4xl">Music</h1>
          </div>
          <p className="text-white text-base font-normal">
            With Music, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.
          </p>
          <p className="text-white font-bold">2022</p>
        </div>

        <div className="hidden sm:flex banner px-8 py-12 flex-col justify-between gap-2">
          <div>
            <h1 className="text-white font-bold sm:text-4xl md:text-5xl">
              Music
            </h1>
            <br />
            <p className="text-white text-base font-normal">
              With Music, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.
            </p>
          </div>
          <p className="text-white font-bold">2022</p>
        </div>

        <div className="w-full px-8 md:px-16 py-16 md:py-0 flex items-center justify-center">
          
          <div className="w-full sm:max-w-md">
            <Image alt="Logo" src="/icon.jpg" width={100} height={100} className="mb-16 mx-auto hidden sm:block"/>

            <Heading h1 className="font-semibold !text-neutral-800 mb-6">
              Login
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
                className="text-sm transition-all font-medium bg-white dark:bg-white dark:text-neutral-800 w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 focus:ring-emerald-600 border-gray-300 focus:border-emerald-600 outline-none"
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
                  className="text-sm transition-all font-medium bg-white dark:bg-white dark:text-neutral-800 w-full px-4 py-[0.6rem] rounded-md mt-2 border focus:ring-1 ring-gray-300 focus:ring-emerald-600 border-gray-300 focus:border-emerald-600 outline-none"
                  autoComplete="off"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="z-10 mr-0.5 p-1.5 mt-2 rounded-md absolute right-0 backdrop-blur-lg focus:ring-1 ring-gray-300 focus:ring-emerald-600 border-gray-300 focus:border-emerald-600 outline-none"
                >
                  {showPassword ?
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                    :
                    <EyeOffIcon className="w-5 h-5 text-gray-600" />
                  }
                </button>
              </div>
            </div>

            <Button.success onClick={handleLogin} className="w-full !text-base">{loading ? "Logging in..." : "Login"}</Button.success>
          </div>
          
        </div>

      </div>

    </div>
  );
}
