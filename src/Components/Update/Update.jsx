import React, { useState } from 'react'
import {createUser} from "../../utils/ApiCall"
import { useMutation, useQueryClient } from 'react-query'

const UpdateData = () => {
    let [postData,setPostData] = useState({
        title : "",
        body : ""
    })

    const queryKeyInvalidation = useQueryClient()
    const {data,isLoading,mutateAsync} = useMutation("createPost" , createUser,{
      onMutate : async (newPost)=>{
        console.log("new", newPost);
       await   queryKeyInvalidation.cancelQueries("posts")
        let priviousData = queryKeyInvalidation.getQueryData("posts")
        console.log("pri", priviousData);
        queryKeyInvalidation.setQueryData("posts",(oldData)=>{
       
            return  [newPost,...oldData, ]
        })
        return {
            priviousData,
        }
      },
      onError : (_error, _posts, context)=>{
              queryKeyInvalidation.setQueryData("posts", context.priviousData)
      },
      onSettled :()=>{
        queryKeyInvalidation.invalidateQueries("posts")
      }

    
    })
    let handleChange =(e)=>{
        setPostData({
            ...postData,
            [e.target.name]:e.target.value
        })
    }

    let handleSubmit = async ()=>{
        console.log("click");
      if((postData.title !== "") && (postData.body !== "")){
        await mutateAsync(postData)
      }else{
        window.alert("Add")
      }
       
    }

  return (
    <div className='px-5 shadow-lg bg-red-500 space-x-5'>
      <input type="text" placeholder='Enter Your Title' name="title" onChange={(e)=>handleChange(e)}/>
      <textarea role={2} cols={35} aria-expanded={false} type="body" placeholder='Enter Your Body' name="body" onChange={(e)=>handleChange(e)}/>
      <button onClick={handleSubmit} className='bg-black text-white font-semibold text-lg p-4'>Update Data</button>
    </div>
  )
}

export default UpdateData