import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getToken } from "../api/getToken";
import registerImg from "../assets/images/register.svg";
import {
  registerUser,
  signInWithGoogle,
  userSignOut,
} from "../firebase/authentication";

const Register = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setisLoading] = useState(false);

  const submitHandler = async (data) => {
    const {
      email,
      email_mb,
      password,
      password_mb,
      imageUrl,
      imageUrl_mb,
      fullName,
      fullName_mb,
    } = data;

    const user = {
      email: email ? email : email_mb,
      password: password ? password : password_mb,
      imageUrl: imageUrl ? imageUrl : imageUrl_mb,
      fullName: fullName ? fullName : fullName_mb,
    };

    reset();
    setError("");
    setisLoading((loading) => (loading = true));
    const response = await registerUser(user);
    setisLoading((loading) => (loading = false));
    if (!response?.uid) {
      setError(response);
    } else {
      const token = await getToken({ email: user.email });
      if (!token) {
        await userSignOut();
        toast.error(
          "Access token is not given!So user will be signed out! Please try again later."
        );
      }
    }
  };

  const googleHandler = async () => {
    setError("");
    const response = await signInWithGoogle();
    if (!response?.uid) {
      setError(response);
    } else {
      const token = await getToken({ email: response.email });
      if (!token) {
        await userSignOut();
        toast.error(
          "Access token is not given!So user will be signed out! Please try again later."
        );
      }
    }
  };

  let content;

  if (isLoading)
    content = (
      <div className="mx-auto">
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  else
    content = (
      <>
        <div className="w-full xl:w-[50%] h-[90vh]  flex flex-col items-center justify-center gap-10">
          <h1 className="text-4xl font-semibold font-serif uppercase">
            Sign Up
          </h1>
          <form
            action=""
            className="w-[90%] sm:w-[26em] rounded-md min-h-[40em] flex flex-col items-center justify-around shadow shadow-neutral p-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <label className="hidden sm:flex input-group">
                <span className="w-[6em]">Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="input input-bordered"
                  {...register("email")}
                />
              </label>
              <input
                type="text"
                className="block sm:hidden input w-full h-[3em] ring ring-primary"
                placeholder="Email"
                {...register("email_mb")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <label className="hidden sm:flex input-group">
                <span className="w-[6em]">Password</span>
                <input
                  type="password"
                  className="input input-bordered "
                  {...register("password")}
                />
              </label>
              <input
                type="password"
                className="block sm:hidden input w-full h-[3em] ring ring-primary"
                placeholder="Password"
                {...register("password_mb")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <label className="hidden sm:flex input-group">
                <span className="w-[6em]">Name</span>
                <input
                  type="text"
                  className="input input-bordered "
                  {...register("fullName")}
                />
              </label>
              <input
                type="text"
                className="block sm:hidden input w-full h-[3em] ring ring-primary"
                placeholder="Full Name"
                {...register("fullName_mb")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <label className="hidden sm:flex input-group">
                <span className="w-[6em]">Url</span>
                <input
                  type="text"
                  className="input input-bordered "
                  {...register("imageUrl")}
                />
              </label>
              <input
                type="text"
                className="block sm:hidden input w-full h-[3em] ring ring-primary"
                placeholder="Image Url"
                {...register("imageUrl_mb")}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              {error && (
                <p className="text-center font-bold mt-1 text-error text-sm">
                  {error}
                </p>
              )}
              <button type="submit" className="btn w-[10em] btn-primary">
                Sign UP
              </button>
            </div>

            <h1 className="text-center font-semibold">OR</h1>
            <h1 className="text-xl font-semibold">Sign in with</h1>

            <i
              className="cursor-pointer text-4xl text-primary fa-brands fa-google"
              onClick={googleHandler}
            ></i>
          </form>
        </div>
        <img
          src={registerImg}
          className="w-[50%] max-h-[40em] aspect-auto hidden xl:block"
          alt=""
        />
      </>
    );
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-[96%] mx-auto sm:w-[80%] min-h-[80vh] flex items-center justify-between">
        {content}
      </div>
    </>
  );
};

export default Register;
