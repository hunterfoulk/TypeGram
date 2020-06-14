import React, { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import Register from "./components/register/register";
import Login from "./components/login/login";
import axios from "axios";
import PostModal from "./components/postmodal/postmodal";
import Backdrop from "./components/backdrop/backdrop";

// interface Props {
//   posts: Posts[];
// }

export const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [posts, setPosts] = useState<[]>([]);

  const PostModalFunc = (): void => {
    setBackdrop(true);
    setPostModal(true);
    setDropdown(false);
  };

  const PostModalFuncClose = (): void => {
    setBackdrop(false);
    setPostModal(false);
  };

  const GetPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/instagram/posts");
      const jsonData = await response.json();

      setPosts(jsonData);
      console.log("posts", jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetPosts();
  }, []);

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

      <Main setPosts={setPosts} GetPosts={GetPosts} posts={posts} />
    </div>
  );
};

export default App;
