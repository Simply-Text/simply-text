import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function UserInfo() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        {user ? (
          <div>
            Logged in as
            {name}
            <div>{user?.email}</div>
            <button className="dashboard__btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserInfo;
