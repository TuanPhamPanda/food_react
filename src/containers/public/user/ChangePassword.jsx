import React, { useState } from 'react'

const ChangePassword = () => {
  const handleChangePassword = ()=>{

  }
  document.title = 'Đổi mật khẩu';
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [rePasswordNew, setRePasswordNew] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="flex justify-center items-center mt-8 mb-12 h-full">
    <div className="form shadow-2xl shadow-yellow-500/50 p-10 flex flex-col gap-8">
      <div className="title w-full flex justify-center font-semibold text-2xl">
        <h3 className="title">Đổi mật khẩu</h3>
      </div>
      <div className="w-full flex flex-col gap-4 font-serif text-xl">
        <label className="inline-block" htmlFor="passwordOld">
          Nhập mật khẩu cũ
        </label>
        <input
          id="passwordOld"
          className="w-full rounded-md p-2 email"
          type="password"
          value={passwordOld}
          onChange={(e) => setPasswordOld(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-4 font-serif text-xl">
        <label className="inline-block" htmlFor="passwordNew">
          Nhập mật khẩu mới
        </label>
        <input
          id="passwordNew"
          className="w-full rounded-md p-2 email"
          type="password"
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-4 font-serif text-xl">
        <label className="inline-block" htmlFor="RePasswordNew">
          Nhập lại mật khẩu
        </label>
        <input
          id="RePasswordNew"
          className="w-full rounded-md p-2"
          type="password"
          value={rePasswordNew}
          onChange={(e) => setRePasswordNew(e.target.value)}
        />
      </div>

      {error.length === 0 ? (
        <></>
      ) : (
        <span className="text-red-500">{error}</span>
      )}

      <button onClick={() => handleChangePassword()} className="btn w-full p-4">
        Đổi mật khẩu
      </button>
    </div>
  </div>
  )
}

export default ChangePassword
