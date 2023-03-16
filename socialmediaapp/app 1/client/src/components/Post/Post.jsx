import React, { useState } from "react"
import './Post.css'
import Comment from '../../images/comment.png'
import Heart from '../../images/like.png'
import Share from '../../images/share.png'
import NotLike from '../../images/notlike.png'
import { likePost } from "../../api/PostRequest"
import { useSelector } from "react-redux"

const Post = ({data})=>{
    const {user} = useSelector((state) => state.authReducer.authData)
    const [liked,setLiked] = useState(data.likes.includes(user._id))
    const [likes,setLikes] = useState(data.likes.length)
    const handleLike = ()=>{
        setLiked((prev)=>!prev)
        likePost(data._id,user._id)
        liked? setLikes((prev)=> prev-1) : setLikes((prev)=> prev+1)
    }
    return(
        <div className='Post'>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER +data.image : ""} alt=""/>
            <div className="postReact">
                <img src={liked?Heart: NotLike} alt=""  style={{cursor:"pointer"}} onClick={handleLike}/>
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>
            <span style={{color:"var(--gray)",fontSize:'12px'}}>{likes} likes</span> 
            <div className="detail">
                <span><b>{data.name}</b></span>
                <span><b>{data.desc}</b></span>
            </div>

        </div>
    )
}
export default Post