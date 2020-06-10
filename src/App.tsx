import React, { useState } from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import Register from "./components/register/register";
import Login from "./components/login/login";
import axios from "axios";
import PostModal from "./components/postmodal/postmodal";
import Backdrop from "./components/backdrop/backdrop";

export const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const PostModalFunc = (): void => {
    setBackdrop(true);
    setPostModal(true);
    setDropdown(false);
  };

  const PostModalFuncClose = (): void => {
    setBackdrop(false);
    setPostModal(false);
  };

  return (
    <div className="App">
      <Navbar
        setPostModal={setPostModal}
        setBackdrop={setBackdrop}
        PostModalFunc={PostModalFunc}
        setRegister={setRegister}
        setLogin={setLogin}
        setDropdown={setDropdown}
        dropdown={dropdown}
      />
      {backdrop && <Backdrop PostModalFuncClose={PostModalFuncClose} />}
      {postModal && <PostModal />}
      {login && <Login setLogin={setLogin} />}
      {register && <Register />}

      <Main />
    </div>
  );
};

export default App;
