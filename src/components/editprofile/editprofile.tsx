import React, { useEffect } from "react";
import "./editprofile.scss";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../state";

interface Props {}

const EditProfile: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <>
      <div className="edit-main">
        <div className="edit-container">
          <div className="edit-header">
            <img src={auth.user.img} />
            <div className="text-container">
              <span>{auth.user.username}</span>
              <p
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
