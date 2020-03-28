import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Main from "../structure/pages/Main";
import ProceduresRouter from "../structure/pages/procedure/ProceduresRouter";
import PageTemplate from "./PageTemplate";
import Users from "../structure/pages/user/Users";
import Logs from "../structure/pages/log/Logs";

import { ProceduresPath, UsersPath, LogsPath } from "../../utils/BuildPaths";

const Root = props => {
  return (
    <PageTemplate
      isLoggedIn={props.isLoggedIn}
      action={props.action}
      location={props.history.location.pathname}
      isAdmin={props.isAdmin}
      isActive={props.isActive}
      snackMessage={props.snackMessage}
    >
      <Switch>
        <Route
          path={ProceduresPath()}
          name={"ProceduresRouter"}
          component={ProceduresRouter}
        />
        <Route path={LogsPath()} name={"LogsRouter"} component={Logs} />
        <Route path={UsersPath()} name={"UsersRouter"} component={Users} />
        <Route name={"Main"} component={Main} />
      </Switch>
    </PageTemplate>
  );
};

export default withRouter(Root);
