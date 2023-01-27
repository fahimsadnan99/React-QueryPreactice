import React from 'react'
import { useParams } from 'react-router-dom'
import {singlePostData} from "../../utils/ApiCall"
import { useQuery } from 'react-query'
import Loading from '../../Components/Loading/Loading'

const SinglePost = () => {
  let {id} = useParams()

  const {data,isLoading} = useQuery(["singlePost",id],() => singlePostData(id),{
    keepPreviousData : false,
    onError : (error)=>{
      window.alert(error.message)
    }
  })

console.log(data);
  return (
<>
    {
      isLoading ? (<Loading></Loading>) : (<div className='px-60'>

      <p>Id - {data?._id}</p>

      <p>Title - {data?.title}</p>
      <p> {data?.body}</p>
   </div>)
}
  </>
    
  )
 

  }
export default SinglePost