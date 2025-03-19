// import React,{ useState } from 'react'
// import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const[email,setEmail]=useState("");
//     const[password,setPassword]=useState("");
//     const navigate=useNavigate()

//     const handleSubmit=async(e)=>{
//         try {
//           e.preventDefault()
//           const response=await axios.post('/api/login',{
//             email:email,
//             password:password
//           })
//           console.log(response.data)
//           if(response.status===200){
//             toast.success("Login Successfull");
//             sessionStorage.setItem("token",response.data.token)
//             sessionStorage.setItem("userId",response.data._id)
//             // navigate("/")
//           }
//           setTimeout(()=>{
//             navigate("/")
//           },3000)
//         } catch (error) {
//            toast.error("Something went wrong. Please try again.");
//         }
//       }
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Login






import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast.success("Login Successful");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data._id);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
