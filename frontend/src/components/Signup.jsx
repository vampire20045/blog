import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import avtar from "../assets/avtar.jpg";
import { useState } from 'react';

function Signup() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async () => {
    setLoading(true);
    const url = "http://localhost:7000/User/Register";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ password, email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location = '/'; 
    } catch (error) {
      setError("Sign up failed. Please provide correct information.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 mx-auto bg-blue-500/10 backdrop-blur-lg h-[550px] w-full max-w-[900px] rounded-lg shadow-lg">
      <center>
        <div>
          <Avatar
            alt="User"
            src={avtar}
            sx={{ width: 100, height: 100, mt: 10 }}
          />
          <div className="bg-white/50 backdrop-blur-md h-[400px] w-full max-w-[600px] mt-7 rounded-3xl shadow-lg">
            <div className="w-full max-w-[500px] pt-10 mx-auto">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                sx={{ mt: 2, boxShadow: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                sx={{ mt: 2, boxShadow: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="text-red-500 mt-2">{error}</div>}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, boxShadow: 3 }}
                onClick={signup}
                disabled={loading}
              >
                {loading ? "Signing up..." : "SIGN UP"}
              </Button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Signup;