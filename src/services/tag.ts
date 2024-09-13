import Axios from "../plugins/Axios.ts";

export const getTag = () => {
    return Axios.post("/tag/list")
}

export const AddTag = async (data: any) => {
    return await Axios.post("/tag/add", data)
}

export const updateTag = async (data: any) => {
    return await Axios.post("/tag/update", data)
}
export const deleteTag = async (tagId: any) => {
    return await Axios.get("/tag/delete", {
        params: {
            'tagId': tagId
        }
    })
}