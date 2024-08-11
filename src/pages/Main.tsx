import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../components/Loader";
import { SignIn } from "./SignIn";
import { Post } from "./post/Post";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export interface IPost {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main: React.FC = () => {
  const [user, isLoading, error] = useAuthState(auth);

  const [postList, setPostList] = useState<IPost[] | null>(null);
  const postRef = collection(db, "post");

  const getPost = async () => {
    const data = await getDocs(postRef);
    console.log(data.docs.map((doc) => doc.data()));
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-50 text-lg font-normal tracking-norrmal antialiased">
          Message: {error.message}
        </p>
      </div>
    );
  }
  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4 py-28 bg-slate-200 dark:bg-gray-900">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-8 xl:w-4/4 lg:w-2/1 w-1/1 items-center justify-center">
              {postList?.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
          ) : (
            <SignIn />
          )}
        </>
      )}
    </div>
  );
};
