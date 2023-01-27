import React, { useState } from 'react'
import {createUser} from "../../utils/ApiCall"
import { useMutation, useQueryClient } from 'react-query'

const FormData = () => {
    let [postData,setPostData] = useState({
        title : "",
        body : ""
    })

    const queryKeyInvalidation = useQueryClient()
    const {data,isLoading,mutateAsync} = useMutation("createUser" , createUser,{
      onSuccess : ()=>{
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
      <button onClick={handleSubmit} className='bg-black text-white font-semibold text-lg p-4'>Sumit</button>
    </div>
  )
}

export default FormData