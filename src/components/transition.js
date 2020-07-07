import React from "react";
import { Transition } from "react-spring/renderprops";

const ModalTransition = ({ postModal, children }) => {
  return (
    <Transition
      items={postModal}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{ duration: 100 }}
    >
      {(open) => open && ((props) => <div style={props}>{children}</div>)}
    </Transition>
  );
};

export default ModalTransition;
