import { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import avtar from "../assets/avtar.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    const url = "http://localhost:7000/user/Login";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 mx-auto bg-blue-500/10 backdrop-blur-lg h-[550px] w-full max-w-[900px] rounded-lg shadow-lg">
      <center>
        <div>
          <Avatar alt="User" src={avtar} sx={{ width: 150, height: 150, mt: 10 }} />
          <div className="bg-white/50 backdrop-blur-md h-[350px] w-full max-w-[600px] mt-7 rounded-3xl shadow-lg">
            <div className="w-full max-w-[500px] pt-10 mx-auto px-4">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                type="text"
                sx={{ mt: 5, boxShadow: 3 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                sx={{ mt: 5, boxShadow: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="text-red-500 mt-2">{error}</div>}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 5, boxShadow: 3 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </Button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Login;