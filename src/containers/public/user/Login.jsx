import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsEmail } from "../../../ultis/CheckValue";
import { title } from "../../../ultis/title";

const Login = () => {
  document.title = title.login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = () => {
    if(email.length === 0 || password.length === 0){
      setError("Email và mật khẩu không được bỏ trống")
    }else if(checkIsEmail(email)){
      setError("Email bạn vừa nhập không hợp lệ. Vui lòng kiểm tra lại")
    }else{
      if(email === 'tuan12345@gmail.com' && password === "admin123456"){
        navigate("/admin/");
      }
    }

  };

  return (
    <div className="flex justify-center items-center mt-8 mb-12 h-full">
      <div className="form shadow-2xl shadow-yellow-500/50 p-10 flex flex-col gap-8">
        <div className="title w-full flex justify-center font-semibold text-2xl">
      <h3 className="title">ĐĂNG NHẬP</h3>
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

        {error.length === 0 ? (
          <></>
        ) : (
          <span className="text-red-500">{error}</span>
        )}


        <button
          onClick={() => handleLogin()}
          className="btn w-full p-4"
        >
          Đăng nhập ngay
        </button>

        <div className="desc flex gap-4 text-xl items-center">
          <h3>Bạn chưa có tài khoản?</h3>
          <button
            className="cursor-pointer text-xl font-bold btn" 
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
