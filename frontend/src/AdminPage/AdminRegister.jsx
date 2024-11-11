import { useState } from "react";
function AdminRegister(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Register</h2>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">
                    Admin Register
                </button>
            </div>
        </div>
    )

}
export default AdminRegister;