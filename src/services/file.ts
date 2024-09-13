import Axios from "../plugins/Axios.ts";

export const upload = async (data: any) => {
    return await Axios.post('/common/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}