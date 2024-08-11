import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkmode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const signOutGoogle = async () => {
    await signOut(auth);
    navigate("/signIn");
  };

  // const x = useMotionValue(0);
  // const opacity = useTransform(x, [-150, 0, 100], [0, 1, 0]);
  return (
    <motion.div className="flex w-full items-center justify-center fixed top-0 left-0 z-50">
      <div className="flex xl:w-3/5 md:w-11/12 w-full md:px-0 px-4 items-center justify-between my-2">
        <motion.div
          whileHover={{ scale: 1.3 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ type: "spring", stiffness: 40, damping: 2.5 }}
          initial={{ scale: 0 }}
        >
          <Link to={"/"}>
            <img
              src="/Bamboo.png"
              alt="logo"
              className="md:w-16 md:h-16 w-12 h-12 rounded-full object-contain border-2"
            />
          </Link>
        </motion.div>
        <div className="flex items-center justify-center">
          {user && (
            <>
              <div className="flex items-center justify-center mr-3 md:mr-2">
                <Link
                  className="md:px-4 md:py-2 px-1 py-1 text-[12px] text-gray-50 text-bold rounded-br-lg rounded-tl-lg bg-slate-600 hover:bg-gradient-to-tl from-indigo-700 to-pink-400 transition ease-linear duration-100 delay-100 hover:scale-105"
                  to={"/createpost"}
                >
                  Create Post
                </Link>
              </div>
              <div className="flex lg:flex-row flex-col items-center justify-center">
                <img
                  src={`${
                    user ? (
                      user?.photoURL
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )
                  }`}
                  alt="logo"
                  className="md:w-8 md:h-8 w-6 h-6 rounded-full object-contain"
                />
                <span className="dark:text-gray-50 text-gray-800 md:text-sm text-[12px] font-extrabold tracking-wide mx-1">
                  {user?.displayName}
                </span>
              </div>
              <div
                className={
                  darkMode
                    ? "flex w-12 h-6 md:mx-4 mx-2 items-center justify-start rounded-full bg-gradient-to-br from-indigo-500 to-pink-600"
                    : "flex w-12 h-6 md:mx-4 mx-2 items-center justify-end rounded-full bg-gradient-to-br from-indigo-700 to-pink-600"
                }
              >
                <motion.button
                  transition={{ type: "spring", damping: 4 }}
                  animate={
                    !darkMode ? { x: -2, speed: 100, rotate: 280 } : { x: 0 }
                  }
                  className="bg-transparent rounded-full mx-0.5"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
              <button
                onClick={signOutGoogle}
                className="md:px-3 md:py-2 px-2 py-1 lg:mx-8 md:mx-4 rounded-full bg-gradient-to-tl from-red-700 hover:from-red-500 to-red-500 hover:to-pink-300 text-gray-50 hover:text-gray-900 text-[12px] font-semibold tracking-wide transform transition hover:scale-105 shadow-xl"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
