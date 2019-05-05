import React from 'react';

function refTrans(Component) {
    class Parent extends React.Component {
        constructor () {
            super();
            console.log();
        }
        componentDidMount () {
        }
        render () {
            const {forwardedRef, ...rest} = this.props;
            
            // console.log(this.porps);
            // console.log('forwardedRef: ', forwardedRef);
            return (<Component ref={forwardedRef} {...rest}></Component>);
        }
    }
    let forwardRef = (props, ref) => (<Parent {...props} forwardedRef={ref} value="123"></Parent>);

    forwardRef.displayName = `Parent(${Component.displayName || Component.name || 'component'})`;


    return React.forwardRef(forwardRef);
}

export default refTrans;
