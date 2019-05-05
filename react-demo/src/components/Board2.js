import React, {Component} from 'react';
import Square from './Square';

class Board2 extends Component {
    
    render () {
        const router = this.props.router;

        return (<div style={{textAlign: 'center'}}>
            <h2>Router</h2>
            <p>state: {router.location.state}</p>
            <Square  value={this.props.router.match.url}/>;
        </div>);
    }
}

export default (router) => <Board2 router={router}/>;