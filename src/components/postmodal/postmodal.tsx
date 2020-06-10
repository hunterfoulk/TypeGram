import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

interface Props {}

const PostModal: React.FC<Props> = ({}) => {
  const [caption, setCaption] = useState<string>("");
  const [img, setImg] = useState<any>(null);
  return (
    <div className="post-modal">
      <div className="post-header">
        <h1>Upload Picture</h1>
      </div>
      <form>
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
