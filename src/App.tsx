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
import AccountFeed from "./components/accountfeed/acccountfeed";
import EditProfile from "./components/editprofile/editprofile";

export const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [picmodal, setPicModal] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [{ auth }, dispatch] = useStateValue();
  const [accountPosts, setAccountPosts] = useState<[]>([]);
  const [accountModal, setModal] = useState(false);

  const PostModalFunc = (): void => {
    setBackdrop(true);
    setPostModal(true);
    setDropdown(false);
  };

  const PostModalFuncClose = (): void => {
    setBackdrop(false);
    setPostModal(false);
    setModal(false);
    setPicModal(false);
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

  const GetAccountPosts = async () => {
    let user_id = auth.user.user_id;

    const queryParams = { params: { user_id } };

    await axios
      .get("http://localhost:5000/instagram/accountfeed", queryParams)
      .then((res) => {
        console.log("app data", res.data);
        setAccountPosts(res.data);
      })
      .catch((error) => console.error("post not updated succesfully", error));
  };

  useEffect(() => {
    GetAccountPosts();
    console.log("fired");
  }, [auth.user]);

  // const GetUser = async () => {
  //   let user_id = auth.user.user_id;

  //   const queryParams = { params: { user_id } };

  //   await axios
  //     .get("http://localhost:5000/instagram/getuser", queryParams)
  //     .then((res) => {
  //       console.log("app data", res.data);
  //     })
  //     .catch((error) => console.error("post not updated succesfully", error));
  // };

  // useEffect(() => {}, [auth]);

  // useEffect(() => {
  //   GetUser();
  //   console.log("profile picture changed");
  // }, [auth.user.img]);

  return (
    <div className="App">
      <Router>
        {backdrop && <Backdrop PostModalFuncClose={PostModalFuncClose} />}
        {postModal && (
          <PostModal
            GetPosts={GetPosts}
            PostModalFuncClose={PostModalFuncClose}
            GetAccountPosts={GetAccountPosts}
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

        {/* ACCOUNT FEED */}
        <Route
          exact
          path="/profile"
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
              <AccountFeed
                setAccountPosts={setAccountPosts}
                accountPosts={accountPosts}
                GetAccountPosts={GetAccountPosts}
                setBackdrop={setBackdrop}
                setModal={setModal}
                accountModal={accountModal}
                GetPosts={GetPosts}
                posts={posts}
              />
            </>
          )}
        ></Route>

        {/* EDIT PROFILE ROUTE */}
        <Route
          exact
          path="/editprofile"
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
              <EditProfile
                setBackdrop={setBackdrop}
                setPicModal={setPicModal}
                picmodal={picmodal}
                PostModalFuncClose={PostModalFuncClose}
                GetAccountPosts={GetAccountPosts}
              />
            </>
          )}
        ></Route>
      </Router>
    </div>
  );
};

export default App;
