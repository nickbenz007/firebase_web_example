import { IPost } from "../Main";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface Props {
  post: IPost;
}

export interface Likes {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;

  const [likes, setLikes] = useState<Likes[] | null>(null);

  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const isUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const likePost = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLikePost = async () => {
    try {
      const likeDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeDeleteData = await getDocs(likeDeleteQuery);
      const likeId = likeDeleteData.docs[0].id;
      const likeDelete = doc(db, "likes", likeId);
      await deleteDoc(likeDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 60, damping: 5.5 }}
      animate={{ scale: 1 }}
      initial={{ scale: 0.5 }}
      className="flex w-80 h-96 p-8 bg-gradient-to-b from-indigo-100 dark:from-gray-900 to-slate-300 dark:to-indigo-900 shadow-xl hover:shadow-indigo-300 dark:hover:shadow-purple-800 rounded-3xl items-start justify-center"
    >
      <div className="flex flex-col w-full h-full py-2 justify-between">
        <div className="flex">
          <h1 className="dark:text-gray-50 text-gray-900 font-bold text-xl underline">
            {post.title}
          </h1>
        </div>
        <div className="flex w-full h-full pt-4">
          <p className="dark:text-gray-50 text-gray-900 font-normal text-sm">
            {post.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={isUserLiked ? removeLikePost : likePost}
              className="w-7 h-7 border border-gray-300 rounded-full bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-400 hover:transition hover:transform hover:scale-110"
            >
              {isUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
            <small className="text-gray-900 dark:text-gray-50 text-[10px] tracking-wider mx-2">
              Likes:{likes?.length}
            </small>
          </div>
          <small className="dark:text-gray-50 text-gray-900 text-sm font-normal tracking-widest">
            @{post.username}
          </small>
        </div>
      </div>
    </motion.div>
  );
};
