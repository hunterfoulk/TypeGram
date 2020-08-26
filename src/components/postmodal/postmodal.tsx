import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useStateValue } from "../../state";
import axios from "axios";
import useLockBodyScroll from "../bodyScroll";

interface Props {
  GetPosts: () => void;
  PostModalFuncClose: () => void;
  GetAccountPosts: () => void;
}

const PostModal: React.FC<Props> = ({
  GetPosts,
  PostModalFuncClose,
  GetAccountPosts,
}) => {
  useLockBodyScroll();
  const [caption, setCaption] = useState<string>("");
  const [img, setImg] = useState<any>(null);
  const [likes, setLikes] = useState(0);
  const [{ auth }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(typeof auth.user.user_id);
  }, []);

  const newPost = async (e: FormEvent) => {
    e.preventDefault();

    let postData = new FormData();

    let poster = auth.user;
    let userId = auth.user.user_id;

    postData.append("poster", JSON.stringify(poster));
    postData.append("userId", userId);
    postData.append("caption", caption);
    postData.append("img", img);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/typegram/updatepic",
        postData,
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("response", res);
        console.log("post sent to database");
      })
      .catch((error) => {
        console.error("error", error);
      });

    GetAccountPosts();
    GetPosts();
    PostModalFuncClose();
    console.log("poster", poster);
  };

  return (
    <div className="post-modal">
      <div className="post-header">
        <h1>Upload Picture</h1>
      </div>
      <form onSubmit={(e: FormEvent) => newPost(e)}>
        <span>Picture</span>
        <input
          type="file"
          onChange={(e: any) => {
            setImg(e.target.files[0]);
            console.log(e.target.value);
          }}
        />

        <span>Caption</span>
        <textarea
          value={caption}
          onChange={(e: any) => {
            setCaption(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button type="submit">
          <FiUpload className="upload-icon" />
          Upload
        </button>
      </form>
    </div>
  );
};

export default PostModal;
