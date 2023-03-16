import * as UploadApi from '../api/UploadRequest'
export const uploadImage = (data) => async(dispatch) =>{
    try{
        await UploadApi.uploadImage(data)
    }catch(error){
        console.log(error)

    }
}
export const uploadPost = (data) => async(dispatch)=>{
    dispatch({type:"Upload_start"})
    try{
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "Upload_Success", data:newPost.data})
    }catch(error){
        console.log(error)
        dispatch({type:"Upload_Fail"})
    }
}