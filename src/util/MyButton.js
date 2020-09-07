import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

export default ({
  children,
  onClick,
  btnClassName,
  tipClassName,
  tip,
  placement,
}) => (
  <Tooltip title={tip} className={tipClassName} placement={placement}>
    <IconButton className={btnClassName} onClick={onClick}>
      {children}
    </IconButton>
  </Tooltip>
);
