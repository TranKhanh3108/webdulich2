import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import React  from 'react';
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Xin chào!</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="Tên người dùng" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="Mật khẩu"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Đăng Nhập
        </button>
        {error && <span className="failure">Xin hãy thử lại!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
