import React from "react";

import SearchAppBar from "./SearchAppBar";

const Header = props => (
  <SearchAppBar
    isAdmin={props.isAdmin}
    isLoggedIn={props.isLoggedIn}
    location={props.location}
    action={props.action}
    isActive={props.isActive}
  />
);

export default Header;
