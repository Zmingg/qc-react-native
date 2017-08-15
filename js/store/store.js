import { createStore,  applyMiddleware } from 'redux'
import blogReducer from '../reducers/reducers'
import thunk from 'redux-thunk';

const logger = store => next => action => {
    console.log('Dispatch: ', action);
    let result = next(action);
    console.log('next state', store.getState().nav);
    return result;
};

export default store = createStore(
    blogReducer,
    applyMiddleware(thunk)
);
