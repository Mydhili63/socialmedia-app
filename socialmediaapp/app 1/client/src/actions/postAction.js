import * as PostApi from '../api/PostRequest'
export const  getTimelinePosts = (id) => async(dispatch) =>{
    dispatch({type:"Retreiving_Start"})
    try{
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({type:"Retreiving_Success",data:data})
    }catch(error){
        dispatch({type:"Retreiving_Fail"});
        console.log(error);

    }
};