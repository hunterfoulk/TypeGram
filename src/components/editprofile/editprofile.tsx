import React, { useEffect, useState } from "react";
import "./editprofile.scss";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../state";

interface Props {
  setPicModal: SetPicModal;
  picmodal: boolean;
  setBackdrop: SetBackDrop;
  PostModalFuncClose: () => void;
}

const EditProfile: React.FC<Props> = ({
  setPicModal,
  picmodal,
  setBackdrop,
  PostModalFuncClose,
}) => {
  const [{ auth }, dispatch] = useStateValue();

  const history = useHistory();

  return (
    <>
      <div className="edit-main">
        {picmodal && (
          <div className="pic-modal">
            <div className="pic-header">
              <span>Change Profile Picture</span>
            </div>
            <div className="pic-upload">
              <button>Change Profile Picture</button>
            </div>
            <div onClick={() => PostModalFuncClose()} className="cancel-upload">
              <span>Cancel</span>
            </div>
          </div>
        )}
        <div className="edit-container">
          <div className="edit-header">
            <img src={auth.user.img} />
            <div className="text-container">
              <span>{auth.user.username}</span>
              <p
                onClick={() => {
                  setBackdrop(true);
                  setPicModal(true);
                }}
                style={{
                  margin: "0px",
                  color: "#0095f6",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Change Profile Picture
              </p>
            </div>
          </div>
          <form>
            <span>Name</span>
            <input type="text" />

            <span>Website</span>
            <input type="text" />

            <span>Bio</span>
            <textarea />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
