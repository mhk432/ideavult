"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SiGoogle } from "react-icons/si";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleRegister = async (data) => {
    const { name, email, photo, password } = data;

    try {
      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photo,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      console.log(data)

      if (res) {
        await authClient.signOut();

        toast.success("Account created successfully!");

        setTimeout(() => {
          router.push("/login");
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
    <div
      className="container mx-auto min-h-[80vh] flex
      justify-center items-center bg-gray-100 px-4"
    >
      <div className="w-full max-w-md p-8 rounded-3xl bg-white shadow-xl my-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register Your Account
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Name */}
          <fieldset>
            <legend className="font-bold mb-2">Name</legend>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </fieldset>

          {/* Photo URL */}
          <fieldset>
            <legend className="font-bold mb-2">Photo URL</legend>

            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
              {...register("photo", {
                required: "Photo URL is required",
              })}
            />

            {errors.photo && (
              <p className="text-red-600 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </fieldset>

          {/* Email */}
          <fieldset>
            <legend className="font-bold mb-2">Email</legend>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
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
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </fieldset>

          <button
  type="submit"
  className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-xl font-semibold transition"
>
  Register
</button>
        </form>

       

        <p className="text-center text-2xl font-bold mx-2">or</p>
          <button className="btn  w-full py-2 rounded-full border border-purple-600 btn-block text-cyan-300 text-center mx-auto flex justify-center items-center bg-lime-950" onClick={handleGoogleSignin}><SiGoogle size={15}  />Loing with Google</button>
      </div>
    </div>
  );
};

export default RegisterPage;