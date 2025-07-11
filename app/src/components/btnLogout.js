import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function BtnLogout() {
	const navigate = useNavigate();

	var handle_logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		navigate("/login")
	}

  return (<>
		<button  className="sidebar-menu__link" onClick={handle_logout}>
			<span class="text-2xl text-danger-600 d-flex"><i class="ph ph-sign-out"></i></span>
			<span class="text">Log Out</span>
		</button>
	</>); 
}

export default BtnLogout;
