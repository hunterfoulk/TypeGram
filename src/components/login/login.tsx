import React, { useState } from "react";
import axios from "axios";
import { useStateValue } from "../../state";

interface Props {
  setLogin: SetLogin;
}

const Login: React.FC<Props> = ({ setLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [{ auth }, dispatch] = useStateValue();

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

        setLoggedIn(true);
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
    </div>
  );
};
export default Login;
