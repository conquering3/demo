import React, {Component} from 'react';
import './Square.scss';

class Square extends Component {
    constructor (props) {
        super(props);
        console.log();
    }
    componentDidMount () {
    }
    render () {
        return (<span className="square" onClick={this.props.onParentEvent}>{this.props.value}</span>);
    }
}

export default React.forwardRef((props, ref) => <Square ref={ref} {...props}></Square>);