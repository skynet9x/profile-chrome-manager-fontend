import React, { createContext, useState } from "react";

import $ from 'jquery';
import './auth.scss';
import { useNavigate } from "react-router-dom";

import cover_login from '../../assets/images/cover-login.png';
import axiosClient from '../../api/axiosClient.js'
import NotAuth from '../../components/NotAuth'
function LoginPage() {
	const navigate = useNavigate();
	const [user, SetUser] = useState(false);
	const [access_token, SetAccesstoken] = useState(false);
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const [username, SetUsername] = useState("");
	const [password, SetPassword] = useState("");
	const [is_remember, SetRemember] = useState(false);

	var handle_toggle_password = (e) => {
		$(e.target).toggleClass("active");
		var input = $($(e.target).attr("id"));
		if (input.attr("type") == "password") {
		input.attr("type", "text");
		} else {
		input.attr("type", "password");
		}
	}

	var handle_login = async (e) => {
		setLoading(true);

		e.preventDefault(); 
		const res = await axiosClient({
			method: 'POST',
			url: '/login',
			data: JSON.stringify({
				username: username,
				password: password
			})
		});

		if (res.status == 400) {
			setError(res.response.data)
		}
		
		if (res.status == 200) {
			SetUser(res.data.user)
			SetAccesstoken(res.data.access_token)
			
			localStorage.setItem('user', JSON.stringify(res.data.user));
			localStorage.setItem('access_token', res.data.access_token);

			navigate('/');
		}
		
		setLoading(false);
	};

  return (
	<>
		<NotAuth />
		<section className="auth d-flex" >
			<div className="auth-left bg-white-50 flex-start">
				<img src={cover_login} alt="cover login" />
			</div>
			<div className="auth-right py-40 px-24 flex-center flex-column">
				<div className="auth-right__inner mx-auto w-100">
					<form action="#" onSubmit={handle_login}>
						<div className="mb-24">
							<label for="fname" className="form-label mb-8 h6">Username</label>
							<div className="position-relative">
								<input type="text" className="form-control py-11 ps-40" id="fname" name="username" placeholder="Type your username" value={username} onChange={(e) => SetUsername(e.target.value)} />
								<span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex"><i className="ph ph-user"></i></span>
							</div>
							<span className="text-danger-600 d-flex">{ (error.username && error.username.length > 0 ) ? error.username[0] : "" }</span>
						</div>

						<div className="mb-24">
							<label for="current-password" className="form-label mb-8 h6">Password</label>
							<div className="position-relative">
								<input type="password"  name="password" className="form-control py-11 ps-40" id="current-password" placeholder="Enter Password" value={password} onChange={(e) => SetPassword(e.target.value)}  />
								<span className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash" id="#current-password" onClick={handle_toggle_password}></span>
								<span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex"><i className="ph ph-lock"></i></span>
							</div>
							<span className="text-danger-600 d-flex">{ ( error.password && error.password.length > 0 ) ? error.password[0] : "" }</span>
						</div>
						<div className="mb-32 flex-between flex-wrap gap-8">
							<div className="form-check mb-0 flex-shrink-0">
								<input className="form-check-input flex-shrink-0 rounded-4" type="checkbox" value="" id="remember" name="is_remember" checked={ (is_remember) ? "checked" : ""} onChange={(e) => SetRemember($(e.target).is(":checked")) }/>
								<label className="form-check-label text-15 flex-grow-1" for="remember">Remember Me </label>
							</div>
						</div>

						<button type="submit" className="btn btn-main rounded-pill w-100">Sign In</button>

						<p className="mt-32 text-gray-600 text-center">New on our platform?
							<a href="/sign-up" className="text-main-600 hover-text-decoration-underline">Create an account</a>
						</p>
						
					</form>
				</div>
			</div>
		</section>
	</>
  );
}

export default LoginPage;
