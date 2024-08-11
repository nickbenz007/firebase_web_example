import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CreateFormDataTypes {
  title: string;
  description: string;
}

const CreateForm: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Title must be mentioned"),
    description: yup.string().required("Write something for the Post"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormDataTypes>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "post");

  const createPost = async (data: CreateFormDataTypes) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    reset();
    navigate("/");
  };
  return (
    <div className="flex w-full min-h-screen bg-slate-200 dark:bg-gray-900 items-center justify-center">
      <motion.form
        initial={{ scale: 0 }}
        animate={{ left: 100, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 6.5 }}
        onSubmit={handleSubmit(createPost)}
        className="flex w-4/5 xl:w-3/4 md:w-full items-center justify-center pt-10"
      >
        <div className="flex flex-col md:w-2/3 w-full my-8 md:p-20 p-10 rounded-3xl items-start justify-center bg-slate-300 dark:bg-gray-900 shadow-xl shadow-indigo-500">
          <input
            className={
              errors.title
                ? `bg-gray-200 appearance-none border-2 border-red-500 rounded-xl w-full my-4 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500`
                : `bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full my-4 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500`
            }
            placeholder="Title"
            type="text"
            {...register("title")}
          />
          <p className="text-red-500 text-sm font-normal tracking-wider">
            {errors.title?.message}
          </p>
          <textarea
            rows={10}
            className={
              errors.description
                ? `bg-gray-200 appearance-none border-2 border-red-500 rounded-xl w-full my-4 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500`
                : `bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full my-4 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500`
            }
            placeholder="Write a post..."
            {...register("description")}
          />
          <p className="text-red-500 text-sm font-normal tracking-wider">
            {errors.description?.message}
          </p>
          <div className="flex w-44 items-center justify-center">
            <input
              className="text-sm text-bold uppercase transition duration-100 delay-100 hover:scale-105 hover:cursor-pointer bg-slate-600 hover:bg-gradient-to-tl from-indigo-700 to-pink-400 appearance-none border-0 border-gray-200 rounded-tl-xl rounded-br-xl w-full my-4 md:py-3 py-2 md:px-4 px-3 text-gray-50 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
              type="submit"
            />
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateForm;
