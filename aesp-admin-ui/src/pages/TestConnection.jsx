import React, { useEffect, useState } from "react";
import { getHelloMessage } from "../api/adminApi";

const TestConnection = () => {
  const [message, setMessage] = useState("Đang kết nối...");

  useEffect(() => {
    getHelloMessage()
      .then((data) => setMessage(data))
      .catch(() => setMessage("Kết nối thất bại!"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Kết nối Backend</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;
