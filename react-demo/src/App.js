import React, { Component } from "react";
import * as createReactClass from "create-react-class";
import "./App.css";
import Square from "./components/Square";
import { withRouter } from 'react-router-dom';

// React.createClass() class 语法糖 16.0版本以后取消了
const Test = createReactClass({
    getInitialState() {
        return {
            value: 123
        };
    },
    render() {
        return <div>我是一个createClass语法糖{this.state.value}</div>;
    }
});

// 高阶组件withRouter Provider传递一个{...router},  Consumer
const GoToPrivate = withRouter(({history}) => 
    (<button onClick={() => history.push('/private')}>goToPrivate</button>)
);
// App
class App extends Component {
    // constructor
    constructor() {
        super();
        this.state = {
            parent: 3,
            value: "state",
            data: [1, 2, 3, 4, 5, 6]
        };
        this.onParentEvent = this.onParentEvent.bind(this);
        this.myRef = React.createRef();
    }
    onParentEvent() {
        this.setState({ parent: 345 });
    }
    Clock2(props) {
        return <div>当前时间: {props.date.toLocaleDateString()}</div>;
    }
    sayHello(e, val) {
        // console.log(e);
        this.setState({
            value: val
        });
    }
    
    // 生命周期钩子
    // step: 1
    componentWillMount() {}
    // setp: 3
    componentDidMount() {
        // console.log("App ref current: ", this.myRef.current);
        // console.log(this);
    }
    // step: 4
    componentWillReceiveProps() {}
    // 性能优化函数 step: 5
    shouldComponentUpdate() {
        // console.log("update");
        return true;
    }
    // step: 6
    componentWillUpdate() {}
    // step: 8
    componentDidUpdate() {}
    // step: 9
    componentWillUnmount() {}
    // step: 2/7
    render() {
        let board = [];

        board = this.state.data.map((item, i) => {
            return (
                <button key={i} onClick={e => {this.sayHello(e, item);}}>
                    <Square value={item} onParentEvent={this.onParentEvent} />
                </button>
            );
        });

        return (
            <div className="App" ref={this.myRef}>
                <header className="App-header">
                    <this.Clock2 date={new Date()} />
                    <GoToPrivate></GoToPrivate>
                </header>
                <main>
                    <div className="board">{board}</div>
                    <div className="container">
                        <p>I am from {this.state.value}</p>
                    </div>
                    <div>parent: {this.state.parent}</div>
                    <Test />
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}

export default (router) => {
    return <App/>
};
