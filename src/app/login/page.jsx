"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { SiGoogle } from "react-icons/si";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleLogin = async (data) => {
    try {
      const { data: res, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (res) {
        toast.success("Login successful!");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });

      toast.success("Google Login Successful");
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white shadow-xl my-20">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login Your Account
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* Email */}
          <fieldset>
            <legend className="font-bold mb-2">Email</legend>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email field is required",
              })}
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </fieldset>

          {/* Password */}
          <fieldset>
            <legend className="font-bold mb-2">Password</legend>

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password field is required",
              })}
            />

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </fieldset>

          {/* Forgot Password UI Only */}
          <div className="text-right">
            <Link
              href="#"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>

        
        <div className="divider">OR</div>

        <p className="text-center text-2xl font-bold">or</p>
                                <button className="btn  w-full py-2 rounded-full border border-purple-600 btn-block text-cyan-300 text-center mx-auto flex justify-center items-center bg-lime-950" onClick={handleGoogleSignin}><SiGoogle size={15}  />Loing with Google</button>

        {/* Register Link */}
        <p className="mt-5 text-center text-gray-600">
          Don have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default LoginPage;