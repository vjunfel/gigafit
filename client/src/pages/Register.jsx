import { useState } from "react";
import API from "../api"; // Your axios instance
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		// if (password !== confirmPassword) {
		// 	return toast.error("Passwords do not match.");
		// }

		try {
			const response = await API.post("/users/register", {
				firstName,
				lastName,
				mobileNo,
				email,
				password,
			});
			console.log("REGISTRATION: ", response);

			if (response.status !== 201) {
				throw new Error("Registration failed");
			}

			toast.success("Registration successful!");
			navigate("/login"); // Redirect after success
		} catch (error) {
			console.error(
				"Registration error:",
				error.response?.data || error.message
			);
			toast.error(error.response?.data?.message || "Registration failed.");
		}
	};

	return (
		<form
			onSubmit={handleRegister}
			className="mx-auto d-flex flex-column justify-content-center align-items-center mt-2"
			style={{ maxWidth: "400px" }}
		>
			<h2 className="mt-5 pt-5 pb-4 text-center">Register</h2>

			<div className="mb-3 w-100">
				<label>Firstname</label>
				<input
					type="text"
					className="form-control"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</div>
			
			<div className="mb-3 w-100">
				<label>Lastname</label>
				<input
					type="text"
					className="form-control"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>
				
			<div className="mb-3 w-100">
					<label>Mobile Number</label>
					<input
						type="text"
						className="form-control"
						value={mobileNo}
						onChange={(e) => setMobileNo(e.target.value)}
						required
					/>
				</div>

			<div className="mb-3 w-100">
				<label>Email</label>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className="mb-3 w-100">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>

			{/* <div className="mb-3 w-100">
					<label>Confirm Password:</label>
					<input
						type="password"
						className="form-control"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div> */}

			<button	type="submit"	className="btn btn-primary w-100">Register</button>
			<p className="my-5 text-center">Already have an account? &nbsp;
				<Link to="/login">Login </Link>
			</p>
		</form>
	);
};

export default Register;
