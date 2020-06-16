import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import Register from "./components/register/register";
import Login from "./components/login/login";
import axios from "axios";
import PostModal from "./components/postmodal/postmodal";
import Backdrop from "./components/backdrop/backdrop";
import { useStateValue } from "../src/state";

export const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [{ auth }, dispatch] = useStateValue();

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

  useEffect(() => {}, [auth]);

  return (
    <div className="App">
      <Router>
        {backdrop && <Backdrop PostModalFuncClose={PostModalFuncClose} />}
        {postModal && (
          <PostModal
            GetPosts={GetPosts}
            PostModalFuncClose={PostModalFuncClose}
          />
        )}

        <Route
          exact
          path="/feed"
          render={() => (
            <>
              <Navbar
                setPostModal={setPostModal}
                setBackdrop={setBackdrop}
                PostModalFunc={PostModalFunc}
                setRegister={setRegister}
                setLogin={setLogin}
                setDropdown={setDropdown}
                dropdown={dropdown}
              />
              <Main setPosts={setPosts} GetPosts={GetPosts} posts={posts} />
            </>
          )}
        ></Route>

        {/* LOGIN ROUTE */}
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Login setLogin={setLogin} />
            </>
          )}
        ></Route>

        {/* SIGNUP ROUTE */}
        <Route
          exact
          path="/register"
          render={() => (
            <>
              <Register />
            </>
          )}
        ></Route>
      </Router>
    </div>
  );
};

export default App;
