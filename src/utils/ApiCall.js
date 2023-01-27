import axios from "axios";


export const AllPostData = async()=>{
    try{
        let {data} = await axios.get("http://localhost:5000/api/post")
        return data
    }catch(err){
        throw new Error("Unable to get all post data")
    }
}


export const singlePostData = async(id)=>{
    try{
        let {data} = await axios.get(`http://localhost:5000/api/post/${id}`)
        return data
    }catch(err){
        throw new Error("Unable to get  post data")
    }
}


export const createUser = async(postData)=>{

     try{
        let {data} = await axios.post(`http://localhost:5000/api/post`,postData)
        return data
     }catch(err){
        throw new Error(err.response)
     }
}


export const deletePost = async(id)=>{
    try{
        let {data} = await axios.delete(`http://localhost:5000/api/post/${id}`)
        return data
    }catch(err){
        throw new Error("Unable to delete  post data")
    }
}
