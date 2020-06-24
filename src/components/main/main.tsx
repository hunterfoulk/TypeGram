import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import "./main.scss";
import axios from "axios";
import { useStateValue } from "../../state";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

interface Props {
  posts: Post[];
  setPosts: SetPosts;
  GetPosts: () => void;
}

interface Comment {
  name: string;
  comment: string;
  img: string;
}

const Main: React.FC<Props> = ({ posts, GetPosts, setPosts }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [comment, setComment] = useState<Comment>({
    name: auth.user.username,
    img: auth.user.img,
    comment: "",
  });

  useEffect(() => {
    console.log("auth", auth.user.username);
  }, []);

  const IncrementLikes = async (post: any, i: number) => {
    // console.log("users in comments", post.users);

    let postId = parseInt(post.post_id);
    let user = auth.user;
    if (post.users.some((p: any) => p.user_id === user.user_id)) {
      console.log("user in array", user.user_id);
      let filteredUsers = post.users.filter(
        (user: any) => user.user_id === user.user_id
      );
      console.log("new users in array", filteredUsers);

      // let postsCopy: any = [...posts];
      // let indexOfPost = postsCopy.findIndex(
      //   (i: any) => i.post_id === post.post_id
      // );

      // postsCopy[indexOfPost].likes--;
      // let newLikes = post.likes;
      // console.log("newlikes", newLikes);

      //////////////////////////////////////////////////////////
    } else {
      let postsCopy: any = [...posts];
      let indexOfPost = postsCopy.findIndex(
        (i: any) => i.post_id === post.post_id
      );

      postsCopy[indexOfPost].likes++;
      let newLikes = post.likes;

      setPosts(postsCopy);
      console.log("users", post.users);

      const queryParams = { params: { postId, newLikes, user } };

      console.log("likes", newLikes);

      await axios
        .get("http://localhost:5000/instagram/updatelikes", queryParams)
        .then((res) => {
          console.log("main data", res.data);

          GetPosts();
        })
        .catch((error) => console.error("post not updated succesfully", error));
    }
  };

  const NewComment = async (e: FormEvent, post: any, comment: {}) => {
    e.preventDefault();
    let post_id = parseInt(post.post_id);

    const queryParams = { params: { post_id, comment } };

    await axios
      .get("http://localhost:5000/instagram/updatecomments", queryParams)
      .then((res) => {
        console.log("data", res.data);
      })
      .catch((error) => console.error("post not updated succesfully", error));
    GetPosts();

    setComment({ name: auth.user.username, img: auth.user.img, comment: "" });
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
                            top: "3px",
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
                    <div
                      style={{ paddingLeft: "2px" }}
                      className="comment-container"
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          margin: "0px 4px 0px 0px",
                        }}
                      >
                        {comment.name}
                      </span>
                      <span style={{ margin: "0px 0px 0px 0px" }}>
                        {comment.comment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="messages-container">
                <form onSubmit={(e: FormEvent) => NewComment(e, post, comment)}>
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
