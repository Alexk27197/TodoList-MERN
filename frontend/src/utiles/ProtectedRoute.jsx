import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let timer;

    if (!user && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (!user && countdown === 0) {
      setRedirect(true);
    }
    return () => clearTimeout(timer);
  }, [user, countdown]);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return user ? (
    children
  ) : (
    <div style={{ textAlign: "center", paddingTop: "20vh" }}>
      <ClipLoader color="red" size={50} />
      <p>Redirecting to login in {countdown} seconds...</p>
    </div>
  );
};

export default ProtectedRoute;
