import React from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";

import {
  Flex,
  WhiteSpace,
  InputItem,
  List,
  Button,
  WingBlank,
  Brief,
  Tag,
  Badge
} from "antd-mobile";

const ListHeader = ({ children, render = children }) => {
  // Allow render, child function, or normal.
  const doRender = typeof render === "function" ? render : () => render;
  return (
    <div
      style={{
        fontSize: "16px",
        fontWeight: 700,
        height: "16px",
        lineHeight: "16px",
        paddingBottom: "9px",
        paddingLeft: "15px",
        paddingTop: "15px"
      }}
    >
      {doRender()}
    </div>
  );
};

const BoundedPage = ({ children, render = children }) => {
  const doRender = typeof render === "function" ? render : () => render;
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto 20px" }}>{doRender()}</div>
  );
};

class CreateOrJoinPage extends React.Component {
  state = {
    code: "",
    name: localStorage.getItem("lastEnteredName") || ""
  };
  handleJoin = e => {
    // Check to make sure they have filled out the form
    if (
      this.state.code.trim().length < 1 ||
      this.state.name.trim().length < 1
    ) {
      e.preventDefault();
    }
  };
  render() {
    return (
      <BoundedPage
        render={() => (
          <WingBlank>
            <ListHeader>Create a meeting</ListHeader>
            <WhiteSpace size="sm" />
            <Link to={`/meeting/create`}>
              <Button type="primary">Create</Button>
            </Link>
            <WhiteSpace />
            <WhiteSpace size="lg" />
            <Flex justify="center">
              <i>- or -</i>
            </Flex>
            <WhiteSpace size="sm" />
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                height: "16px",
                lineHeight: "16px",
                paddingBottom: "9px",
                paddingLeft: "15px",
                paddingTop: "15px"
              }}
            >
              Join a meeting
            </div>
            <WhiteSpace size="small" />
            <form
              onSubmit={() => {
                alert("yo");
              }}
            >
              <List>
                <InputItem
                  placeholder="enter a meeting code"
                  clear
                  value={this.state.code}
                  onChange={value => this.setState({ code: value })}
                >
                  Code
                </InputItem>
                <InputItem
                  placeholder="enter your name"
                  clear
                  value={this.state.name}
                  onChange={value =>
                    this.setState({ name: value }, () => {
                      localStorage.setItem("lastEnteredName", value);
                    })
                  }
                >
                  Name
                </InputItem>
              </List>
              <WhiteSpace size="lg" />
              <Link
                to={`/meeting/join/code/${this.state.code}/as-name/${
                  this.state.name
                }`}
                onClick={this.handleJoin}
              >
                <Button type="primary">Join</Button>
                <WhiteSpace />
              </Link>
            </form>
            <WhiteSpace size="lg" />
            <WhiteSpace size="sm" />
          </WingBlank>
        )}
      />
    );
  }
}

class JoinMeetingPage extends React.Component {
  state = {
    password: ""
  };
  render() {
    const { params: { name, code } } = this.props.match;
    return (
      <BoundedPage>
        <WingBlank>
          <p>
            Joining the meeting with code <strong>{code}</strong> as{" "}
            <strong>{name}</strong> requires a password.
          </p>
          <ListHeader>Password Required</ListHeader>
          <WhiteSpace size="small" />
          <form
            onSubmit={() => {
              alert("yo");
            }}
          >
            <List>
              <InputItem
                type="password"
                placeholder="enter meeting password"
                clear
                value={this.state.password}
                onChange={value => this.setState({ password: value })}
              >
                Password
              </InputItem>
            </List>
            <WhiteSpace size="lg" />
            <Link
              to={`/meeting/lobby/code/${code}/as-name/${name}`}
              onClick={this.handleJoin}
            >
              <Button type="primary">Join</Button>
              <WhiteSpace />
            </Link>
          </form>
          <WhiteSpace size="lg" />
          <WhiteSpace size="sm" />
        </WingBlank>
      </BoundedPage>
    );
  }
}

class CreateMeetingPage extends React.Component {
  render() {
    return (
      <div>
        <p>Creating meeting.</p>

        <p>Under development</p>
      </div>
    );
  }
}

class MeetingLobbyPage extends React.Component {
  state = {
    expanded: false
  };
  render() {
    const { params: { name, code } } = this.props.match;
    return (
      <BoundedPage>
        <WingBlank>
          <p>
            Welcome to the lobby for the meeting. You used code {code} and name{" "}
            {name}
          </p>
          <List renderHeader={() => <div>Agenda</div>}>
            <List.Item multipleLine extra="5min">
              Intro
              {/*<List.Item.Brief>Added by Jim C</List.Item.Brief>*/}
            </List.Item>
            <List.Item multipleLine extra="5min">
              Rules
              {/*<List.Item.Brief>Added by Jesse</List.Item.Brief>*/}
            </List.Item>
            <List.Item
              wrap={this.state.expanded}
              align="top"
              multipleLine
              arrow={this.state.expanded ? "up":"down" }
              extra="20min"
              onClick={() => this.setState({expanded: !this.state.expanded})}
            >
              New graphic designer
              <List.Item.Brief style={{height: this.state.expanded ? "auto" : "20px", textOverflow: "ellipsis", whiteSpace: this.state.expanded ? "normal":""}}>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: this.state.expanded ? "normal" : "" }}>We should hire a new graphic designer by the end of the month.<br />I think I am not trying</div>
              </List.Item.Brief>
              <WhiteSpace />
              <div className="tag-container" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal"}}>
                <Badge text="discussion" hot style={{ marginLeft: 5 }} />
                <Badge text="hiring" style={{ marginLeft: 5, backgroundColor: "#531dab" }} />
                <Badge text="design" style={{ marginLeft: 5 }} />
              </div>
            </List.Item>
            <List.Item multipleLine extra="20min" arrow="horizontal">
              Open Discussion A
              <List.Item.Brief>
                Contract w/external content writers expires next month.<br />{" "}
                <strong style={{ fontSize: "11px" }}>Jim</strong>
              </List.Item.Brief>
            </List.Item>
          </List>
        </WingBlank>
      </BoundedPage>
    );
  }
}

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={CreateOrJoinPage} />
      <Route
        exact
        path="/meeting/join/code/:code/as-name/:name"
        component={JoinMeetingPage}
      />
      <Route exact path="/meeting/create" component={CreateMeetingPage} />
      <Route
        exact
        path="/meeting/lobby/code/:code/as-name/:name"
        component={MeetingLobbyPage}
      />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
