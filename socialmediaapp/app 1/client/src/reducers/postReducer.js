const postReducer = (
    state ={posts: [], loading:false , error: false,uploading: false},
    action
) =>{
    switch(action.type){
        case "Upload_start":
            return {...state, uploading: true, error: false}
        case "Upload_Success":
            return {...state, posts:[action.data,...state.posts], uploading: false, error: false}
        case "Upload_Fail":
            return {...state, uploading: false, error: true}
        default:
            return state
    }

}
export default postReducer