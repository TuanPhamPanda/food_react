import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAccount } from "../../../apis";
import { title } from "../../../ultis/title";
import { checkIsEmail, arrayPhone, removeClass } from "../../../ultis/ValueStatic";

const Register = () => {
  document.title = title.register;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [phoneCode, setPhoneCode] = useState(() => arrayPhone[0].value);
  
  const handleError = (error, idInput, idPrev) => {
    const element = document.getElementById(idInput);
    element.style.border = "1px solid red";
    element.scrollIntoView({ behavior: "smooth" });

    if(idPrev !== undefined){
      removeClass(idPrev)
    }
    const parent = element.parentNode;
    const span = document.createElement("span");
    span.className = "text-3xl text-red-500 mt-2";
    span.innerHTML = error;

    parent.appendChild(span);
  };
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name.length === 0) {
      handleError("Tên không được bỏ trống", "name", undefined);
    } else if (!checkIsEmail(email)) {
      handleError("Không phải email", "email", ["name"]);
    } else if (password.length < 8) {
      handleError("Mật khẩu phải từ 8 ký tự trở lên", "password", ["name", "email"]);
    } else if (password != repassword) {
      handleError("Mật khẩu nhập lại không khớp", "repassword", ["name", "email", "password"]);
    } else if (+phoneNumber.substring(0, 1) === 0) {
      handleError("Số điện thoại không hợp lệ. Vui lòng không nhập số 0 đầu tiên", "phoneNumber", ["name", "email", "password", "password"]);
    } else if (phoneNumber.length === 0) {
      handleError("Số điện thoại không được bỏ trống", "phoneNumber", ["name", "email", "password", "password"]);
    } else {

      const user = {
        user_name: name,
        user_email: email,
        user_phone: phoneCode + phoneNumber,
        user_password: password
      }

      createAccount(user).then(reponse => {
        console.log(reponse);
        if(reponse.status === 200){
          toast.success("Đăng ký thành công");
          navigate("/login");
        }else{
          toast.error("Đăng ký thất bại");
        }
      })
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-12 h-full">
      <div className="form shadow-2xl shadow-yellow-500/50 p-10 flex flex-col gap-8">
        <div className="title w-full flex justify-center font-semibold text-2xl">
          <h3 className="title">ĐĂNG KÝ</h3>
        </div>

        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label className="inline-block" htmlFor="name">
            Nhập tên
          </label>
          <input
            id="name"
            className="w-full rounded-md p-2 border-solid boder border-red-500"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label className="inline-block" htmlFor="email">
            Nhập email
          </label>
          <input
            id="email"
            className="w-full rounded-md p-2"
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
        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label htmlFor="repassword" className="flex-none">
            Nhập lại mật khẩu
          </label>
          <input
            id="repassword"
            className="w-full p-2 shadow-2xl"
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-4 font-serif text-xl">
          <label htmlFor="phoneNumber" className="flex-none">
            Nhập số điện thoại
          </label>

          <div className="flex gap-2 items-center justify-center text-xl">
            <select
              className="w-1/2"
              onChange={(e) => setPhoneCode(e.target.value)}
            >
              {arrayPhone.map((item, index) => (
                <option key={index} value={item.id}>
                  {`(${item.id}) ${item.value}`}
                </option>
              ))}
            </select>
            <input
              id="phoneNumber"
              className="w-full p-2 shadow-2xl"
              type="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => handleRegister()}
          className="h-none w-full p-4 btn mt-4"
        >
          Đăng ký
        </button>

        <div className="desc flex gap-4 text-xl items-center mt-4">
          <h3>Bạn đã có tài khoản?</h3>
          <span
            className="text-text-primary-green cursor-pointer text-xl font-bold btn"
            onClick={(e) => {
              navigate("/login");
            }}
          >
            đăng nhập
          </span>
        </div>
      </div>
    </div>
  );
};
export default Register;
