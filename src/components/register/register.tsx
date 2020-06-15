import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [img, setImg] = useState<any>(null);
  const history = useHistory();

  const HandleRegister = async (e: FormEvent) => {
    e.preventDefault();

    let userData = new FormData();

    userData.append("username", username);
    userData.append("password", password);
    userData.append("img", img);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post("http://localhost:5000/instagram/signup", userData, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        console.log("respone", res);
        console.log("signup sent to database");
      })
      .catch((error) => {
        console.error("error", error);
      });

    setUsername("");
    setPassword("");
    history.push("/");
  };

  return (
    <div className="login-modal">
      <div className="header">
        <span>Signup</span>
      </div>
      <form onSubmit={(e: FormEvent) => HandleRegister(e)}>
        <span>Username</span>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log(e.target.value);
          }}
        />
        <span>Password</span>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
        />
        <span>Profile Picture</span>
        <input
          id="input-file"
          type="file"
          accept="image/gif, image/jpeg, image/png"
          onChange={(e: any) => {
            setImg(e.target.files[0]);
            console.log(e.target.value);
          }}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default Register;
