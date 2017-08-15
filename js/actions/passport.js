

export const ReceivePassport = (json)=>{
    return {
        type: 'ReceivePassport',
        passport: json,
        receivedAt: Date.now()
    }
};

export const GetUser = (json)=>{
    return {
        type: 'GetUser',
        user: json,
        receivedAt: Date.now()
    }
};
