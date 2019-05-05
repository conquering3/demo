import React, {Component} from 'react';
import './Board.scss';
import Square from './Square';
import RefTrans from './Refs';

class Board extends Component {
    constructor (props) {
        super(props);
        this.squareRef = React.createRef();
        this.squareRef2 = React.createRef();
    }
    
    componentDidMount (e) {
       // console.log('Square ref current: ', this.squareRef);
       // console.log('Square ref2 current: ', this.squareRef2);
    }

    render () {
        let Refs = RefTrans(Square);
        let SquareRef = React.forwardRef((props, ref) => (<Square ref={ref} {...props}></Square>));
        const router = this.props.router;

        return (
            <div style={{textAlign: 'center'}}>
                <div>
                    <hr/>
                    <h3>Router</h3>
                    <p>id: {router.match.params.id}</p>
                    <p>url: {router.match.url}</p>
                    <p>path: {router.match.path}</p>
                    <hr/>
                </div>
                <div className="board-box" ref={(el) => {
                    return this.boxRef = el;}}>
                    <div className="board-row">
                        {this.props.children}
                        <SquareRef value="ref" ></SquareRef>
                        <Square value="11" ref={this.squareRef2}></Square>
                        <Square value="22"></Square>
                        <Square value="33"></Square>
                    </div>
                    <div className="board-row">
                        <Square value="44"></Square>
                        <Square value="55"></Square>
                        <Square value="66"></Square>
                    </div>
                    <div className="board-row">
                        <Square value="77"></Square>
                        <Square value="88"></Square>
                        <Square value="99"></Square>
                    </div>
                    <Refs  ref={this.squareRef}></Refs>
                </div>
            </div>

        );
    }
}
/* const name = Square.displayName || Square.name;

forwardRef.displayName = `Board(${name})`;
console.log(forwardRef.displayName); */

// 转发引用, 把父组件的ref转到子组件上, 可以访问到dom /默认不传递,访问不到dom
export default (router) => <Board router={router} />
// React.forwardRef((props, ref) => (<Board ref={ref} {...props}></Board>));