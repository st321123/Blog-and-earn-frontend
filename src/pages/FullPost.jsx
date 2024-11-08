import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FullPostCard } from '../components/FullPostCard';
import LoadingSpinner from '../components/Loading';

export  function FullPost() {
  const navigate = useNavigate();
    const [data,setData] = useState([]);
    const  postId  = useParams().id;
    const BASE_URL =   import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [flag, setFlag] = useState(true);
   
     
    
 
    
    if(!token)
    {
      navigate('/');
    }

    useEffect(()=>{
       const dataa =  axios.get(`${BASE_URL}/${postId}`,{
        headers:{
          Authorization:token
        }
       }).then((val)=>{
       
        
    
    
        
        setData(val.data.db[0]);
       })
    },[postId,flag])
   
   if(data.length === 0)
   {
    return(<LoadingSpinner />)
   }
  
   
   
   
 
   
  return (

    <div className=' h-[80vh]  flex flex-col '>
    
         <FullPostCard flag={flag} setFlag = {setFlag} token = {token} postId = {postId} key = {data._id} userId={data.userId} title={data.title} description={data.description} author = {data.author.userName} authorId = {data.author._id} likeCount = {data.likeCount} />
      
    </div>
  )
}
