'use client'

import { useAuth } from "../../../context/AuthController";
import Navbar from "./Navbar";

const ClientNavbar = () => {
  const { isLoggedIn } = useAuth();

  return <Navbar isAuthenticated={isLoggedIn} />;
};

export default ClientNavbar;
