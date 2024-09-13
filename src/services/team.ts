import Axios from "../plugins/Axios.ts";


export const addteam = async (data:any) =>{
    return await Axios.post('/team/add', data);
}

export const getteam = async (date:any) =>{
    return await Axios.get('/team/list',date);
}

export const jointeam = async (data:any) =>{
    return await Axios.post('/team/join',data);
}

export const select = async (data:any) =>{
    return await Axios.get('/team/list',data);
}

export const getTeamById = async (data:any) =>{
    return await Axios.get('/team/get',data)
}
export const teamUpdate = async (data:any) =>{
    return await Axios.post('/team/update',data)
}

export const teamQuit = async (data:any) =>{
    return await Axios.post('/team/quit',data)
}

export const teamDelete = async (data:any) =>{
    return await Axios.post('/team/delete',data)
}


export const getMyCreateTeam = async () =>{
    return await Axios.get('/team/list/myCreateTeam')
}
export const getMyJoinTeam = async () =>{
    return await Axios.get('/team/list/myJoinTeam')
}