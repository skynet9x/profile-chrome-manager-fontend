import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

	var handle_logout = () => {
		localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    navigate('/login');
    return true;
	}

  handle_logout();
  return (<></>); 
}

export default Logout;
