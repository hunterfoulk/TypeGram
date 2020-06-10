import React, { useState } from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import Register from "./components/register/register";
import Login from "./components/login/login";
import axios from "axios";

export const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);

  return (
    <div className="App">
      <Navbar
        setPostModal={setPostModal}
        setRegister={setRegister}
        setLogin={setLogin}
      />
      {postModal && (
        <div className="post-modal">
          <div className="post-header">
            <h1>Upload Picture</h1>
          </div>
        </div>
      )}
      {login && <Login setLogin={setLogin} />}
      {register && <Register />}

      <Main />
    </div>
  );
};

export default App;
