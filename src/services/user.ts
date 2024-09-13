import Axios from "../plugins/Axios.ts";
import {setCurrentUserState} from "../states/user.ts";


export const getCurrentUser = async () => {
    const res = await Axios.get('/user/current');
    //@ts-ignore
    if (res.code === 0) {
        setCurrentUserState(res as any)
        return res;
    }
    return null;
}

export const updateUser = async (data:any) => {
    return await Axios.post('/user/update',data)
}

export const searchUserList = async (data:any) => {
   return  await Axios.get('/user/search/tags', data)
}

export const getRecommend = async (data:any) => {
    return  await Axios.get('/user/recommend',data)
}

export const getMatch = async (data:any) => {
    return  await Axios.get('/user/match',data)
}


export const logout = async () => {
    return await Axios.post('/user/logout',)
}

export const register = async (data:any) => {
    return await Axios.post('/user/register',data)
}

export const getSign = async () => {
    return await Axios.post('/user/sign')
}

export const isSign = async () => {
    return await Axios.post('/user/issign')
}

export const getSignSum = async () => {
    return await Axios.post('/user/sign/count')
}