import * as UserApi from "../api/UserRequest"
export const updateUser = (id,formData) => async(dispatch) =>{
    dispatch({type:"Updating_start"})
    try{
        const {data} = await UserApi.updateUser(id,formData);
        dispatch({type: "Updating_success", data:data})
    } catch (error){
        dispatch({type: "Updating_fail"})
    }
}
export const followUser =(id,data) => async(dispatch)=>{
    dispatch({type:"Follow_user"})
    UserApi.followUser(id,data)
}
export const unfollowUser =(id,data) => async(dispatch)=>{
    dispatch({type:"Unfollow_user"})
    UserApi.unfollowUser(id,data)
}