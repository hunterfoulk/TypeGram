import React, { useState } from "react";
import axios from "axios";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";

interface Props {
  setLogin: SetLogin;
}

const Login: React.FC<Props> = ({ setLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  const HandleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/instagram/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const user = res.data.payload;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("logged in succesfully");
        console.log("response", res);
        console.log("user", user);

        dispatch({
          type: "login",
          auth: {
            isAuthenticated: true,
            token: res.data.token,
            user: user,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
    setLogin(false);
    history.push("/feed");
  };

  return (
    <div className="login-modal">
      <div className="header">
        <span>Login</span>
      </div>
      <form onSubmit={(e: FormEvent) => HandleLogin(e)}>
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
        <button type="submit">Login</button>
      </form>
      <span
        onClick={() => history.push("/register")}
        style={{
          textAlign: "center",
          color: "#405de6",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Dont have an account? Signup
      </span>
    </div>
  );
};
export default Login;
