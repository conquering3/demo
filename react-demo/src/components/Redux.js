import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from '../reducers';

const store = createStore(rootReducers);

const App = () => (
  <Provider store={store}>
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </Provider>
)

export default App;