import React, { useState } from 'react'

const ForgetPassword = () => {
  document.title = 'Quên mật khẩu';

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleForgetPassword = ()=> {

  }

  return (
    <div className="flex justify-center items-center mt-8 mb-12 h-full">
    <div className="form shadow-2xl shadow-yellow-500/50 p-10 flex flex-col gap-8">
      <div className="title w-full flex justify-center font-semibold text-2xl">
        <h3 className="title">Quên mật khẩu</h3>
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

      {error.length === 0 ? (
        <></>
      ) : (
        <span className="text-red-500">{error}</span>
      )}

      <button onClick={() => handleForgetPassword()} className="btn w-full p-4">
        Lấy lại mật khẩu
      </button>
    </div>
  </div>
  )
}

export default ForgetPassword
