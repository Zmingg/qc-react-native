const RequestFetch = ()=>{
    return {
        type: 'RequestFetch'
    }
};
const ReceiveData = (json)=>{
    return {
        type: 'ReceiveData',
        posts: json.data.map(child => child),
        hasMore: (json.current_page < json.last_page),
        receivedAt: Date.now()
    }
};

const ShouldFetch = (state)=>{
    if (!state.blogsPush) {
        return true
    } else {
        return !posts.isFetching;
    }
};

const FetchBlogs = (page)=>{
    let formData = new FormData();
    formData.append("count",10);
    formData.append("page",page);
    return (dispatch)=>{
        dispatch(RequestFetch());
        return fetch('http://zmhjy.xyz/rapi/blogs',{
            method:'POST',
            body:formData
        })
        .then( response => response.json() )
        .then( json => {
            dispatch(ReceiveData(json))
        })
    }
};

export const GetList = (page)=>{
    return (dispatch,state) => {
        if (ShouldFetch(state)) {
            return dispatch(FetchBlogs(page))
        } else {
            return Promise.resolve()
        }

    }
};


const ReceiveItem = (json)=>{
    return {
        type: 'ReceiveItem',
        item: json,
        receivedAt: Date.now()
    }
};

const FetchItem = (id)=>{
    return (dispatch)=>{
        return fetch('http://zmhjy.xyz/rapi/showBlog?id='+id)
            .then( response => response.json() )
            .then( json => {
                dispatch(ReceiveItem(json))
            })
    }
};

export const GetItem = (id)=>{
    return (dispatch,state) => {

        if(state.ok){
            return Promise.resolve()
        }else{
            return dispatch(FetchItem(id));
        }
    }

};

const ReceiveSearch = (json)=>{
    return {
        type: 'ReceiveSearch',
        items: json.data.map(child => child),
        hasMore: (json.current_page < json.last_page),
        receivedAt: Date.now()
    }
};

const FetchSearch = (text)=>{
    let formData = new FormData();
    formData.append("count",10);
    formData.append("text",text);
    return (dispatch)=>{
        return fetch('http://zmhjy.xyz/rapi/search',{
            method:'POST',
            body:formData
        })
            .then( response => response.json() )
            .then( json => {
                dispatch(ReceiveSearch(json))
            })
    }
};

export const GetSearch = (id)=>{
    return (dispatch,state) => {

        if(state.ok){
            return Promise.resolve()
        }else{
            return dispatch(FetchSearch(id));
        }
    }

};







