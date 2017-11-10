import ZipImage from './zipImage';

export const xfetch = function(url,params){
    return new Promise(async function(resolve,reject){
        let _pa = {};
        _pa['body'] = new FormData();
        _pa['headers'] = new Headers();

        if (!params) { return; }

        if (typeof params.method === 'string') {
            _pa['method'] = params.method;
        }
        if (typeof params.headers === 'object') {
            for(let i in params.headers){
                _pa['headers'].append(i,params.headers[i]);
            }
        }
        if (typeof params.body === 'object') {
            for(let i in params.body){
                _pa['body'].append(i,params.body[i]);
            }
        }

        let _params = {};
        for (let key of Object.keys(params)){
            _params[key] = _pa[key];
        }


        let res = await fetch(url, _params);
        if (res.ok) {
            resolve(res);
        } else {
            reject(res);
        }
    })
};

export const requestPassport = async (user,success,fail)=>{
    try {
        let res = await xfetch('http://zmhjy.xyz/oauth/token',{
            method:'post',
            body:{
                grant_type: 'password',
                client_id: 5,
                client_secret: 'Glv7azYIYsacc2AypTrSpBdCbBAukxBjglXk9QyB',
                username: user.email,
                password: user.pass,
            }
        });
        let json = await res.json();
        success(json);

    } catch(err) {
        fail(err);
    }
};

export const getUser = async (token,success,fail)=>{
    try{
        let auth_token = token.token_type+' '+token.access_token;
        let res = await xfetch('http://zmhjy.xyz/api/user',{
            headers: {
                Accept: "application/json",
                Authorization: auth_token
            }
        });
        let json = await res.json();
        success(json);
    } catch(err) {
        fail(err);
    }
};

export const changeUserPic = async ({uid,img},success,fail=null)=>{

    try {
        let _img = {uri: img.path, type: 'application/octet-stream', name: 'image.jpg'};
        let res = await xfetch('http://zmhjy.xyz/rapi/userPic',{
            method:'POST',
            headers: {
                'Content-Type':'multipart/form-data',
            },
            body: {
                user: uid,
                image: _img
            }
        });
        let json = await res.json();
        success(json);
    } catch(err) {
        fail(err);
    }


};