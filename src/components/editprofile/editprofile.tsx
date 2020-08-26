import React, { useEffect, useState } from "react";
import "./editprofile.scss";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../state";
import axios from "axios";

interface Props {
  setPicModal: SetPicModal;
  picmodal: boolean;
  setBackdrop: SetBackDrop;
  PostModalFuncClose: () => void;

  GetAccountPosts: () => void;
}

const EditProfile: React.FC<Props> = ({
  setPicModal,
  picmodal,
  setBackdrop,
  PostModalFuncClose,
  GetAccountPosts,
}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [img, setImg] = useState<any>();
  const [website, setWebsite] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [name, setName] = useState<string>("");
  const history = useHistory();
  const reader = new FileReader();

  const handlePicChange = async (e: FormEvent) => {
    e.preventDefault();
    console.log("image", img);

    let userData = new FormData();
    let user_id = auth.user.user_id;

    userData.append("img", img);
    userData.append("user_id", user_id);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/typegram/updatepic",
        userData,
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        const user = res.data.payload;
        console.log("response", res);
        console.log("user", user);
        console.log("new profile pic sent to database");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "login",
          auth: {
            user: user,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });

    GetAccountPosts();
    PostModalFuncClose();
  };

  const HandleChangeBio = async (e: FormEvent) => {
    e.preventDefault();
    let user_id = auth.user.user_id;
    await axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/typegram/updatemisc",
        {
          name: name,
          website: website,
          bio: bio,
          user_id: user_id,
        }
      )
      .then((res) => {
        let user = res.data.payload;
        console.log("respone", res);
        console.log("user payload", user);

        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "login",
          auth: {
            user: user,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
    setName("");
    setBio("");
    setWebsite("");
  };

  return (
    <>
      <div className="edit-main">
        {picmodal && (
          <div className="pic-modal">
            <div className="pic-header">
              <span>Change Profile Picture</span>
            </div>

            <form onSubmit={(e: any) => handlePicChange(e)}>
              <div className="pic-upload">
                <label>
                  {" "}
                  Change Profile Picture
                  <input
                    accept="image/gif, image/jpeg, image/png"
                    onChange={(e: any) => {
                      setImg(e.target.files[0]);
                      console.log(e.target.value);
                    }}
                    type="file"
                  />
                </label>
              </div>
              <div
                onClick={() => PostModalFuncClose()}
                className="cancel-upload"
              >
                <span>Cancel</span>
              </div>

              {img ? (
                <div className="pic-confirm">
                  {" "}
                  <button type="submit">Confirm</button>
                </div>
              ) : null}
            </form>
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
          <form onSubmit={(e: FormEvent) => HandleChangeBio(e)}>
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
            />

            <span>Website</span>
            <input
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
            />

            <span>Bio</span>
            <textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
