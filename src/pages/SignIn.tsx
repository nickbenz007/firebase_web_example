import React from "react";
import {
  auth,
  facebookProvider,
  microsoftProvider,
  googleProvider,
} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Google Error", error);
    }
  };
  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (error) {
      console.log("Facebook Error", error);
    }
  };
  const signInWithMicrosoft = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
      navigate("/");
    } catch (error) {
      console.error("Microsoft Error", error);
    }
  };
  return (
    <div className="flex w-full items-center justify-center pt-28">
      <div className="flex flex-col p-16 rounded-3xl items-center justify-center border dark:border-purple-900 border:blue-400 dark:bg-gray-950 bg-slate-200 shadow-2xl dark:shadow-purple-800 shadow-blue-400">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-3xl text-gray-50 font-bold tracking-wide">
            Sign In
          </h1>
        </div>
        <div className="grid grid-rows-3 gap-2 items-center justify-center py-4">
          <button
            onClick={signInWithGoogle}
            className="px-4 py-2 bg-gray-50 border-gray-300 items-center justify-center rounded-2xl transform transition hover:scale-105 delay-150 duration-300"
          >
            <div className="flex items-center justify-start">
              <img
                src="/Google_Icon.png"
                alt="Google button"
                className="w-8 h-8 object-contain"
              />
              <p className="text-sm text-gray-950 font-sans font-medium tracking-wide ml-2">
                SignIn with Google Account
              </p>
            </div>
          </button>
          <button
            onClick={signInWithFacebook}
            className="px-4 py-2 bg-gray-50 border-gray-300 items-center justify-center rounded-2xl transform transition hover:scale-105 delay-150 duration-300"
          >
            <div className="flex items-center justify-start">
              <img
                src="/facebook_icon.png"
                alt="Facebook button"
                className="w-8 h-8 object-contain"
              />
              <p className="text-sm text-gray-950 font-sans font-medium tracking-wide ml-2">
                SignIn with Facebook Account
              </p>
            </div>
          </button>
          <button
            onClick={signInWithMicrosoft}
            className="px-4 py-2 bg-gray-50 border-gray-300 items-center justify-center rounded-2xl transform transition hover:scale-105 delay-150 duration-300"
          >
            <div className="flex items-center justify-start">
              <img
                src="/microsoft_icon.png"
                alt="Microsoft button"
                className="w-8 h-8 object-contain"
              />
              <p className="text-sm text-gray-950 font-sans font-medium tracking-wide ml-2">
                SignIn with Microsoft Account
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
