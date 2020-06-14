import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import "./main.scss";
import axios from "axios";
import { useStateValue } from "../../state";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

interface Props {
  posts: [];
  setPosts: SetPosts;
  GetPosts: () => void;
}

const Main: React.FC<Props> = ({ posts, GetPosts, setPosts }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [comment, setComment] = useState({
    name: auth.user.username,
    comment: "",
  });

  const IncrementLikes = async (post: any, i: number) => {
    let postId = parseInt(post.post_id);
    let user = auth.user;

    let postsCopy: any = [...posts];
    let indexOfPost = postsCopy.findIndex(
      (i: any) => i.post_id === post.post_id
    );

    postsCopy[indexOfPost].likes++;
    let newLikes = post.likes;

    setPosts(postsCopy);

    const queryParams = { params: { postId, newLikes, user } };

    await axios
      .get("http://localhost:5000/instagram/updatelikes", queryParams)
      .then((res) => {
        console.log("data", res.data);
      })
      .catch((error) => console.error("post not updated succesfully", error));
    GetPosts();
  };

  useEffect(() => {
    GetPosts();
  }, []);

  const NewMessage = (e: FormEvent, post: any, comment: {}) => {
    e.preventDefault();

    let newPosts: any = [...posts];
    let indexOfPost = newPosts.findIndex(
      (i: any) => i.post_id === post.post_id
    );

    newPosts[indexOfPost].comments.push(comment);

    console.log("post", indexOfPost);

    console.log(newPosts);
    setComment({ name: auth.user.name, comment: "" });
  };

  return (
    <div className="main">
      <div className="post-container">
        {posts.map((post: any, i: number) => (
          <>
            <div className="post" key={i}>
              <div className="post-header">
                <img src={post.poster.img} />
                <span>{post.poster.username}</span>
              </div>
              <img src={post.img} />
              <div className="post-footer">
                <div className="footer-icons">
                  <AiOutlineLike
                    onClick={() => IncrementLikes(post, i)}
                    style={{
                      fontSize: "25px",
                      paddingLeft: "1px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="likes-container">
                  <span style={{ marginLeft: "5px" }}>{post.likes} likes</span>
                  {post.users.map((user: any) => (
                    <>
                      <Tooltip size="small" title={user.username}>
                        <img
                          className="users-image"
                          style={{
                            position: "relative",
                            top: "2px",
                            height: "30px",
                            width: "30px",
                            borderRadius: "30px",
                            marginLeft: "3px",
                          }}
                          src={user.img}
                        />
                      </Tooltip>
                    </>
                  ))}
                </div>
                <div style={{ paddingLeft: "3px" }} className="bottom">
                  <span className="footer-username">
                    {post.poster.username}
                  </span>
                  <span>{post.caption}</span>
                </div>
                <div>
                  {post.comments.map((comment: any) => (
                    <p style={{ margin: "5px 0px", paddingLeft: "3px" }}>
                      <div className="comment-container">
                        <p
                          style={{
                            fontWeight: "bold",
                            margin: "0px 4px 0px 0px",
                          }}
                        >
                          {comment.name}
                        </p>
                        <p style={{ margin: "0px 0px 0px 0px" }}>
                          {comment.comment}
                        </p>
                      </div>
                    </p>
                  ))}
                </div>
              </div>
              <div className="messages-container">
                <form onSubmit={(e: FormEvent) => NewMessage(e, post, comment)}>
                  <input
                    value={comment.comment}
                    onChange={(e) => {
                      setComment({ ...comment, comment: e.target.value });
                      console.log(e.target.value);
                      console.log("comment name", comment.name);
                    }}
                    type="text"
                    placeholder="Add a comment..."
                  />
                  <button type="submit">Post</button>
                </form>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
export default Main;
