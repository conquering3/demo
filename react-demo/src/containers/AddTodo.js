import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const AddTodo = (props) => {
    let input;
    const { dispatch } = props;

    console.log(props);
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return;
                    }
                    let result = dispatch(addTodo(input.value));
                    input.value = "";
                }}
            >
                <input ref={node => (input = node)} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({a: 1});
const mapDispatchToProps = (dispatch, ownProps) => ({b: 2, c: 3});

export default connect()(AddTodo);