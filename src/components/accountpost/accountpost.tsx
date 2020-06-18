import React, { useState } from "react";
import "./accountpost.scss";
import useLockBodyScroll from "../bodyScroll";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

interface Props {
  content: any;
  setModal: SetAccountModal;
}

const AccountPost: React.FC<Props> = ({ content, setModal }) => {
  useLockBodyScroll();

  const HandleComment = (e: any, content: any) => {
    e.preventDefault();
    console.log("post", content);
  };

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
          <form onSubmit={(e: any) => HandleComment(e, content)}>
            <input placeholder="Add a comment..." />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPost;
