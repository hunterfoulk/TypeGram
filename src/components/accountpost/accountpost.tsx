import React, { useState, useEffect } from "react";
import "./accountpost.scss";
import useLockBodyScroll from "../bodyScroll";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { useStateValue } from "../../state";
import axios from "axios";

interface Props {
  content: any;
  GetPosts: () => void;
  GetAccountPosts: () => void;
  accountPosts: [];
  posts: Post[];
  setContent: SetContent;
}

interface Comment {
  name: string;
  comment: string;
  img: string;
}

const AccountPost: React.FC<Props> = ({
  content,
  GetAccountPosts,
  GetPosts,
  accountPosts,
  posts,
  setContent,
}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [comment, setComment] = useState<Comment>({
    name: auth.user.username,
    img: auth.user.img,
    comment: "",
  });
  useLockBodyScroll();

  const HandleComment = async (e: FormEvent, content: any, comment: {}) => {
    e.preventDefault();

    let post_id = parseInt(content.post_id);

    const queryParams = { params: { post_id, comment } };

    await axios
      .get(
        "http://localhost:9000/.netlify/functions/server/typegram/updatecomments",
        queryParams
      )
      .then((res) => {
        console.log("account post data", res.data);
      })
      .catch((error) => console.error("post not updated succesfully", error));

    GetAccountPosts();
    setComment({ name: auth.user.username, img: auth.user.img, comment: "" });
    console.log("post", content);
  };

  useEffect(() => {
    console.log("fireddd");
  }, [accountPosts]);

  return (
    <>
      <div className="account-modal">
        <div className="modal-left">
          <img src={content.img} />
        </div>
        <div className="modal-right">
          <div className="account-modal-header">
            <img src={content.poster.img} />
            <span>{content.poster.username}</span>
          </div>
          <div className="post-caption">
            <img src={content.poster.img} />
            <span
              style={{
                fontWeight: "bold",
                opacity: "0.8",
                marginLeft: "10px",
                marginRight: "5px",
                position: "relative",
                top: "1px",
              }}
            >
              {content.poster.username}
            </span>
            <span
              style={{
                position: "relative",
                top: "1.8px",
              }}
            >
              {content.caption}
            </span>
          </div>
          <div className="post-comments">
            {content.comments.map((comment: any) => (
              <div className="post-comment">
                <img src={comment.img} />
                <span style={{ fontWeight: "bold", marginRight: "3px" }}>
                  {comment.name}
                </span>
                <span>{comment.comment}</span>
              </div>
            ))}
          </div>
          <div className="post-footer">
            <div className="post-footer-icons">
              <AiOutlineHeart
                style={{
                  fontSize: "28px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              />
              <BsChat style={{ fontSize: "25px", cursor: "pointer" }} />
            </div>
            <span style={{ marginLeft: "7px", marginTop: "8px" }}>
              Like by <b>{content.likes}</b> people
            </span>
          </div>
          <form onSubmit={(e: FormEvent) => HandleComment(e, content, comment)}>
            <input
              value={comment.comment}
              onChange={(e) => {
                setComment({ ...comment, comment: e.target.value });
                console.log(e.target.value);
                console.log("comment name", comment.name);
              }}
              placeholder="Add a comment..."
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPost;
