// import React, { useContext, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';

// const Login = () => {

//   const[currentState,setCurrentState]=useState('Sign Up');
//   const {token,setToken,navigate,backendUrl}=useContext(ShopContext)

//   const [name,setName]=useState("")
//   const [password,setPassword]=useState("")
//   const [email,setEmail]=useState("")

//   const onSumbitHandler=async(event)=>{
//     event.preventDefault();
//     try{
//       if(currentState==='Sign Up'){
//         const response=await axios.post(backendUrl+'/api/user/register',{name,email,password})
//         console.log(response.data)
//       }
//       else{
//         // const response=await axios.post(backendUrl+'/api/user/register')
//       }

//     }
//     catch(err){
//       console.log(err);
//     }

//   }

//   return (
//    <form onSubmit={onSumbitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//     <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//       <p className='prata-regular text-3xl'>{currentState}</p>
//       <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>

//     </div>
//     {currentState==='Login'? "" :<input type='text' onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required></input>}
//     <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email'required></input>
//     <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password'required></input>
//     <div className='w-full flex justify-between text-sm mt-[-8px]'>
//       <p className='cursor-pointer'>Forgot your Password?</p>
//       {
//         currentState==='Login'?<p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p> :
//                                  <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here!</p>
//       }
//     </div>
//     <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login' ?"Sign In":"Sign Up"}</button>
//    </form>
//   )
// }

// export default Login

import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
          } else {
            toast.error(response.data.message);
          }
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password?</p>

        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here!
          </p>
        )}
      </div>
        <div className="cursor-pointer">
      <button className="bg-black text-white font-light px-8 py-2 mt-4 ">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
    
      </button>
      </div>
    </form>
  );
};

export default Login;
