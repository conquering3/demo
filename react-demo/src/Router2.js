import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch,
    StaticRouter,
    NavLink
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import App from "./App";
import Board from "./components/Board";
import Board2 from "./components/Board2";
import Board3 from "./components/Board2";
import "./Router2.scss";

let state = 1;

const clickEvent = () => {
    // console.log(BrowserRouter);
    // console.log(a);
    console.log("board");
    state = !state;
};

// 跳转
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            state ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/board3/12306", state: "from private" }}
                />
            )
        }
    />
);
// 自定义链接 children变量, 会直接显示在界面
const CustomLink = () => (
    <Route
        path="/"
        children={props => {
            console.log(props);
            return <Link to="/">CustomLink</Link>;
        }}
    />
);

// route config
const routes = [
    {
        path: "/",
        component: Board2
    },
    {
        path: "/tacos",
        component: Board2,
        routes: [
            {
                path: "/tacos/bus",
                component: Board2
            },
            {
                path: "/tacos/cart",
                component: Board2
            }
        ]
    }
];
const staticContext = { a: 1, b: 2 };

const Example = () => (
    <div style={{ textAlign: "center" }}>
        <h1>React Router</h1>
        <p style={{ backgroundColor: "gray" }}>Router 1</p>
        <Router>
            <Switch>
                {routes.map(route => (
                    <Route
                        key={Math.round()}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
        </Router>
        <p style={{ backgroundColor: "red" }}>Static Router 2</p>
        {/* 静态路由 */}
        <StaticRouter location="/board/12308" context={staticContext}>
            <Route
                path="/"
                render={props => {
                    console.log(props);
                    return <div>{JSON.stringify(props.staticContext)}</div>;
                }}
            />
        </StaticRouter>
        <p
            style={{ backgroundColor: "blue" }}
            onClick={() => {
                window.confirm("helloworld");
            }}
        >
            Router 3
        </p>
        <Router
            getUserConfirmation={(m, c) => {
                console.log(m);
            }}
        >
            <div>
                <ul>
                    <li>
                        <NavLink to="/">home</NavLink>
                    </li>
                    <li>
                        <Link to="/board/123">board</Link>
                    </li>
                    <li>
                        <Link to="/board2/456">board2</Link>
                    </li>
                    <li>
                        <Link to="/private" onClick={clickEvent}>
                            private
                        </Link>
                    </li>
                </ul>
                <hr style={{ marginBottom: "50px" }} />
                <CustomLink />
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/board" component={Board} />
                    <Route exact path="/board2/:id" component={Board2} />
                    <PrivateRoute path="/private" component={Board} />
                    <Route
                        component={({ location }) => (
                            <div>
                                no match pathname: {location.pathname}-
                                {location.key}
                            </div>
                        )}
                    />
                </Switch>
                {/* <Route render={ ({ location }) => {
                    return (<TransitionGroup>
                        <CSSTransition key={location.key} classNames="fade" timeout={300}>
                            <Switch location={location}>
                            </Switch>
                        </CSSTransition>    
                    </TransitionGroup>)
                }}>
                </Route> */}
            </div>
        </Router>
    </div>
);

export default Example;
