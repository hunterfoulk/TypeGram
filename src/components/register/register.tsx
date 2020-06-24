import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import PhonePicOne from "../../images/phone1.png";
import PhonePicTwo from "../../images/phonepic2.png";

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
    <div className="register-main">
      <div className="register-left-container">
        <div className="pic-container">
          <img src={PhonePicTwo} />
        </div>
      </div>
      <div className="register-right-container">
        <div className="register-modal">
          <div className="header">
            <span>TypeGram</span>
          </div>
          <span style={{ textAlign: "center", fontSize: "24px" }}>Sign up</span>
          <form onSubmit={(e: FormEvent) => HandleRegister(e)}>
            <span>Username</span>
            <input
              style={{ marginBottom: "15px", fontSize: "20px" }}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                console.log(e.target.value);
              }}
            />
            <span>Password</span>
            <input
              style={{ marginBottom: "5px", fontSize: "20px" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
            />

            <label>
              {" "}
              Choose Profile Picture
              <input
                accept="image/gif, image/jpeg, image/png"
                onChange={(e: any) => {
                  setImg(e.target.files[0]);
                  console.log(e.target.value);
                }}
                type="file"
              />
            </label>

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
