import { Modal, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';
function ProfileModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData,setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch() //to call reducers
  const param = useParams()  //access that value in the route by calling the useParams hook
  const {user} = useSelector((state)=>state.authReducer.authData)
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name",fileName);
      data.append("file",profileImage);
      UserData.profilePicture = fileName;
      try{
        dispatch(uploadImage(data));
      }catch(err){
        console.log(err);
      }
    }
    if(coverImage){
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name",fileName);
      data.append("file",coverImage);
      UserData.coverPicture = fileName;
      try{
        dispatch(uploadImage(data));
      }catch(err){
        console.log(err);
      }
    }
    dispatch(updateUser(param.id,UserData));
    setModalOpened(false);
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >
    <form className='infoForm'>
        <h3>Your info</h3>
          <div>
            <input type="text" className="infoInput" name='firstname' placeholder='First Name' onChange={handleChange} value={formData.firstname}/>
            <input type="text" className="infoInput" name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname}/>
          </div>
          <div>
            <input type="text" className="infoInput" name='worksAt' placeholder='Works Atk' onChange={handleChange} value={formData.worksAt}/>
          </div>
          <div>
            <input type="text" className="infoInput" name='livesin' placeholder='Lives In' onChange={handleChange} value={formData.livesin}/>
            <input type="text" className="infoInput" name='country' placeholder='Country' onChange={handleChange} value={formData.country}/>
          </div>
          <div>
            <input type="text" className="infoInput" placeholder='Relationship Status' name = 'relationship' onChange={handleChange} value={formData.relationship}/>
          </div>
          <div>
            Profile Image
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name='coverImage' onChange={onImageChange}/>
          </div>
          <button className='button infobutton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModal;