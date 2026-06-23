import { useState } from "react";

import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      await api.post("/auth/send-otp", { email });
      alert("OTP sent");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Email OTP login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={sendOtp}>Send OTP</button> <br />
      <br />
      <input
        type="text"
        placeholder="OTP"
        onChange={(e) => {
          setOtp(e.target.value);
        }}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}
