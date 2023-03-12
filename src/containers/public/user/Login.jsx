import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-12 h-full">
      <div className="form shadow-lg p-10 flex flex-col gap-8">
        <div className="title w-full flex justify-center font-semibold text-2xl">
          <h3>ĐĂNG NHẬP</h3>
        </div>
        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label className="inline-block" htmlFor="email">
            Nhập email
          </label>
          <input
            id="email"
            className="w-full rounded-md p-2 email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label htmlFor="password" className="flex-none">
            Nhập mật khẩu
          </label>
          <input
            id="password"
            className="w-full p-2 shadow-2xl password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={() => handleLogin()}
          className="bg-main-primary-green w-full p-4"
        >
          Đăng nhập ngay
        </button>

        <div className="desc flex gap-2 text-xl">
          <h3>Bạn chưa có tài khoản?</h3>
          <span
            className="text-text-primary-green cursor-pointer text-xl font-bold"
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Tạo mới
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
