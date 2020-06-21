import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../../state";
import "./accountfeed.scss";
import { Link, useHistory } from "react-router-dom";
import AccountPost from "../accountpost/accountpost";

interface Props {
  accountPosts: [];
  setAccountPosts: SetAccountPosts;
  GetAccountPosts: () => void;
  setBackdrop: SetBackDrop;
  setModal: SetAccountModal;
  accountModal: boolean;
  GetPosts: () => void;
  posts: Post[];
}

const AccountFeed: React.FC<Props> = ({
  accountPosts,
  setBackdrop,
  setModal,
  accountModal,
  GetAccountPosts,
  GetPosts,
  posts,
}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [hovering, setHovering] = useState<boolean>(false);
  const [content, setContent] = useState({});
  const history = useHistory();

  let postNum = accountPosts.length;

  useEffect(() => {
    GetAccountPosts();
    console.log("new accountposts fired");
  }, []);

  return (
    <div className="profile-main">
      {accountModal && (
        <AccountPost
          accountPosts={accountPosts}
          GetPosts={GetPosts}
          GetAccountPosts={GetAccountPosts}
          content={content}
          posts={posts}
          setContent={setContent}
        />
      )}
      <div className="header">
        <div className="header-left">
          <img src={auth.user.img} />
        </div>
        <div className="header-right">
          <span>{auth.user.username}</span>
          <button onClick={() => history.push("/editprofile")}>
            Edit Profile
          </button>
          <span style={{ fontSize: "15px", marginTop: "5px" }}>
            Posts {postNum}
          </span>
          <span style={{ fontSize: "16px" }}>{auth.user.name}</span>
          <div className="bio">
            <span>{auth.user.bio}</span>
          </div>
          <a style={{ fontSize: "20px" }} href="https://hunterfoulk.com/">
            {auth.user.website}
          </a>
        </div>
      </div>
      <div className="post-container-main">
        {accountPosts.map((post: any, i: any) => (
          <div className="post-container">
            <div>
              <img
                onClick={() => {
                  setContent(post);
                  setModal(true);
                  setBackdrop(true);
                  console.log(post);
                }}
                src={post.img}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountFeed;
