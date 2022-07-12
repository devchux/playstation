import React from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

import './AddButton.scss'

const AddButton = ({ children, ...rest }) => {
  return (
    <button className="add-new-button" {...rest}>
      <PlusIcon />
      {children}
    </button>
  );
};

export default AddButton;
