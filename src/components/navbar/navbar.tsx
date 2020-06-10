import React, { useState } from "react";
import "./navbar.scss";
import { BsPeopleCircle } from "react-icons/bs";
import { useStateValue } from "../../state";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

interface Props {
  setLogin: SetLogin;
  setRegister: SetRegister;
  setPostModal: SetPostModal;
}

const Navbar: React.FC<Props> = ({ setLogin, setRegister, setPostModal }) => {
  const [modal, setModal] = useState(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [{ auth }, dispatch] = useStateValue();

  const handleLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      dispatch({
        type: "logout",
      });
    }, 400);
    setDropdown(false);
  };

  return (
    <>
      {auth.isAuthenticated ? (
        <div className="navbar">
          <div className="left">
            <span>LOGO</span>
          </div>
          <div className="middle">
            <input type="search" />
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
                <span onClick={() => setPostModal(true)} className="upload">
                  Upload
                </span>
                <span onClick={() => handleLogout()} className="logout">
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="left">
            <span>LOGO</span>
          </div>
          <div className="middle">
            <input type="search" />
          </div>
          <div className="right">
            <BsPeopleCircle
              onClick={() => setModal(!modal)}
              className="login-icon"
            />
            {modal && (
              <div className="nav-login-modal">
                <span onClick={() => setLogin(true)} className="login-button">
                  Login
                </span>
                <span
                  onClick={() => setRegister(true)}
                  className="signup-button"
                >
                  Signup
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