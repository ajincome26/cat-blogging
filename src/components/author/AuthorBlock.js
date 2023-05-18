import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AuthorBlock = ({ userId }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, "users", userId);
      const user = await getDoc(docRef);
      setUser(user.data());
    }
    getUser();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="flex items-center max-w-3xl mx-auto overflow-hidden rounded-2xl author bg-gray">
      <div className="basis-1/3 h-[250px] rounded-2xl overflow-hidden">
        <img src={user?.avatar} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col gap-5 p-5 basis-2/3">
        <h3 className="text-2xl font-bold text-primary">{user?.fullname}</h3>
        <p className="italic text-secondary">{`"${user?.textarea}"`}</p>
      </div>
    </div>
  );
};

export default AuthorBlock;
