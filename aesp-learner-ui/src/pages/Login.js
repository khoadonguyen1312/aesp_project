import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, message } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));
      navigate("/dashboard");
    } catch {
      message.error("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Learner Login" style={{ width: 350 }}>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input.Password placeholder="Password" className="mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="primary" block className="mt-3" onClick={handleLogin}>Login</Button>
      </Card>
    </div>
  );
}

export default Login;
