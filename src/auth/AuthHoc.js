import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import { CookiesProvider } from "react-cookie";
import { mainPath } from "../utils/BuildPaths";
import { connect } from "react-redux";

import Root from "../components/root/Root";

import { setUserParams } from "../action/AppActions";

class AuthHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userRole: [],
      isActive: null
    };
  }

  componentDidMount() {
    !history.location.search ? this.testCookie() : this.getAccessToken();
  }

  testCookie = () => {
    fetch("http://localhost:3001/api/authorization", {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          this.setState({ isLoggedIn: true });
          return response.json();
        }
        throw new Error();
      })
      .then(data => {
        this.setState({ userRole: data.userRole, isActive: data.isActive });
        this.props.setUserParams(data);
        if (
          (history.location.pathname === "/Users/" &&
            !data.userRole.includes("admin")) ||
          ((history.location.pathname.includes("Procedures") ||
            history.location.pathname.includes("Logs")) &&
            !data.isActive)
        ) {
          history.replace("/");
        }
      })
      .catch(() => history.replace("/"));
  };

  getAccessToken = () => {
    fetch("http://localhost:3001/api/authentication", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ code: history.location.search })
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ isLoggedIn: true });
          history.replace("/");
          return response.json();
        }
      })
      .then(data => {
        this.props.setUserParams(data);
        this.setState({ userRole: data.userRole, isActive: data.isActive });
      });
  };

  logOutAction = () => {
    if (!this.state.isLoggedIn) return;
    fetch("http://localhost:3001/api/authentication", {
      method: "PUT",
      credentials: "include"
    }).then(() => {
      this.setState({ isLoggedIn: false, userRole: [] });
      history.replace("/");
    });
  };

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path={mainPath()}
            render={() => (
              <CookiesProvider>
                <Root
                  snackMessage={this.props.snackMessage}
                  isLoggedIn={this.state.isLoggedIn}
                  action={this.logOutAction}
                  isAdmin={this.state.userRole.includes("admin")}
                  isUser={this.state.userRole === "user"}
                  isActive={this.state.isActive}
                />
              </CookiesProvider>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    snackMessage: store.procedures.snackMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserParams: userData => dispatch(setUserParams(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHoc);
