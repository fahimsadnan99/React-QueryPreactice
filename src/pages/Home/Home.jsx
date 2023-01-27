import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AllPostData ,deletePost} from "../../utils/ApiCall";
import Loading from "../../Components/Loading/Loading";
import FormData from "./FormData";
import UpdateData from "../../Components/Update/Update";

const Home = () => {
  const [addData,setAddData] = useState(true)
  let queryClient = useQueryClient()
  const navigation = useNavigate();
  const { data, isLoading } = useQuery("posts", AllPostData, {
    onError: (error) => {
      window.alert(error.message);
    },
  });

  const {data:deletepost,isLoading:deletePostLoading,mutateAsync} = useMutation("delete",deletePost,{
    onSuccess : ()=>{
      queryClient.invalidateQueries("posts")
    }
  })
  return (
    <>
    {
        isLoading ? (<Loading></Loading> ) : (
            <div className="bg-black">
            <div className="px-40 space-y-4">
              <button onClick={()=> setAddData(!addData)} className="text-white font-bold text-base p-4  text-center bg-red-500">

                Add Or Update
              </button>
              {
                  addData ?( <FormData></FormData>) : ( <UpdateData></UpdateData>)
                }
              {data?.map((post) => {
                return (
                  <div>
                    <button className="bg-red-800 text-white text-center m-auto font-bold my-2 p-2" onClick={async()=>{
                  await mutateAsync(post._id)
                    }}>Delete Post</button>
                  <div className="bg-white shadow-lg rounded-md p-2 cursor-pointer" key={post.id} onClick={()=> navigation(`/${post._id}`)}>
                    <p className="font-semibold font-xl ">{!post._id && "Loading...." }PostId  :-{post.title}</p>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        
        )
    }
  
    </>
  );
};

export default Home;
