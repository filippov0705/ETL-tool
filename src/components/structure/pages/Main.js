import React from "react";

import AppInfo from "../../common/AppInfo";
import AppInfoCards from "../../common/AppInfoCards";
import Page from "../../common/Page";

const Main = props => {
  return (
    <Page>
      <AppInfo />
      <AppInfoCards />
    </Page>
  );
};

export default Main;
