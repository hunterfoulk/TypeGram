import React, { useState } from "react";
import "./navbar.scss";
import { BsPeopleCircle } from "react-icons/bs";
import { useStateValue } from "../../state";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { Link, useHistory } from "react-router-dom";

interface Props {
  setLogin: SetLogin;
  setRegister: SetRegister;
  setPostModal: SetPostModal;
  setBackdrop: SetBackDrop;
  setDropdown: SetDropDown;
  dropdown: boolean;
  PostModalFunc: () => void;
}

const Navbar: React.FC<Props> = ({
  setLogin,
  setRegister,
  PostModalFunc,
  setDropdown,
  dropdown,
}) => {
  const [modal, setModal] = useState(false);
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();

    dispatch({
      type: "logout",
    });

    setDropdown(false);
    history.push("/");
  };

  const profile = () => {
    history.push("/profile");
    setDropdown(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="left">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/feed")}
          >
            TypeGram
          </span>
        </div>
        <div className="middle">
          <input
            style={{ paddingLeft: "10px" }}
            placeholder="Search..."
            type="search"
          />
        </div>
        <div className="right">
          <Tooltip
            title={auth.user.username}
            trigger="mouseenter"
            className="tooltip"
            position="left"
          >
            <img onClick={() => setDropdown(!dropdown)} src={auth.user.img} />
          </Tooltip>
          {dropdown && (
            <div className="dropdown">
              <span onClick={() => profile()} className="upload">
                Profile
              </span>
              <span onClick={() => PostModalFunc()} className="upload">
                Upload
              </span>
              <span onClick={() => handleLogout()} className="logout">
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
      )}
    </>
  );
};
export default Navbar;
