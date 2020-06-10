import React from "react";
import "./backdrop.scss";

interface Props {
  PostModalFuncClose: () => void;
}

const Backdrop: React.FC<Props> = ({ PostModalFuncClose }) => {
  return (
    <>
      <div onClick={() => PostModalFuncClose()} className="backdrop"></div>
    </>
  );
};

export default Backdrop;
