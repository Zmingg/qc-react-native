import { combineReducers } from 'redux';
import { Nav } from '../navigator/nav';
import { NavigationActions } from 'react-navigation';

function getBlogs(state = {
    isFetching: false,
    hasMore: true,
    items: []
}, action) {
    switch (action.type) {
        case 'RequestFetch':
            return Object.assign({}, state, {
                isFetching: true,
            });
        case 'ReceiveData':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
                hasMore: action.hasMore,
                lastUpdated: action.receivedAt
            });

        default:
            return state
    }
}

function getList(state = {}, action) {
    switch (action.type) {
        case 'RequestFetch':
        case 'ReceiveData':
            return Object.assign({}, state, getBlogs(state, action));
        default:
            return state
    }
}

function getItem(state = {item:[],ok:false}, action) {
    switch (action.type) {
        case 'ReceiveItem':
            return Object.assign({}, state, {
                ok:true,
                item: action.item,
                receivedAt: action.receivedAt
            });
        default:
            return state
    }
}
function getSearch(state = {items:[],ok:false}, action) {
    switch (action.type) {
        case 'ReceiveSearch':
            return Object.assign({}, state, {
                ok:true,
                items: action.items,
                receivedAt: action.receivedAt
            });
        default:
            return state
    }
}



function nav(state, action) {
    let nextState;
    nextState = Nav.router.getStateForAction(action, state);
    return nextState || state;
}

function auth(state={isAuth:false}, action) {
    switch (action.type) {
        case 'ReceivePassport':
            return Object.assign({}, state, {
                passport: action.passport,
                receivedAt: action.receivedAt
            });
        case 'GetUser':
            return Object.assign({}, state, {
                isAuth: true,
                user: Object.assign({}, state.user, action.user),
            });
        case 'SignOut':
            return Object.assign({}, state, {
                isAuth: false,
                user: Object.assign({}, state.user, action.user),
            });
        default:
            return state
    }


}




const blogReducer = combineReducers({
    getList,
    getItem,
    getSearch,
    nav,
    auth
});
export default blogReducer