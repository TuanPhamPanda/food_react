import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { title } from "../../../ultis/title";
import { checkIsEmail, arrayPhone } from "../../../ultis/ValueStatic";

const Register = () => {
  document.title = title.register;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState(true);
  const [error, setError] = useState("");
  const [phoneCode, setPhoneCode] = useState(() => arrayPhone[0].value);

  const genders = [
    { id: true, value: "Nam" },
    { id: false, value: "Nữ" },
  ];
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name.length === 0) {
      setError("Tên không được bỏ trống");
    } else if (!checkIsEmail(email)) {
      setError("Không phải email");
    }else if(password.length < 8){
      setError("Mật khẩu phải từ 8 ký tự trở lên");
    } else if (password != repassword) {
      setError("Mật khẩu nhập lại không khớp");
    } else if(+phoneNumber.substring(0,1) === 0){
      setError("Số điện thoại không hợp lệ. Vui lòng không nhập số 0 đầu tiên");
    } else if (phoneNumber.length === 0) {
      setError("Số điện thoại không được bỏ trống");
    } else {
      setError("");

      //call api
      
      toast.success("Đăng ký thành công");
      navigate("/login");
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

        {error.length === 0 ? (
          <></>
        ) : (
          <span className="text-red-500">{error}</span>
        )}

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
