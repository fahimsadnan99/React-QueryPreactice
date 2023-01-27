import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AllPostData } from "../../utils/ApiCall";
import Loading from "../../Components/Loading/Loading";
import FormData from "./FormData";

const Home = () => {
  const navigation = useNavigate();
  const { data, isLoading } = useQuery("posts", AllPostData, {
    onError: (error) => {
      window.alert(error.message);
    },
  });

  return (
    <>
    {
        isLoading ? (<Loading></Loading> ) : (
            <div className="bg-black">
            <div className="px-40 space-y-4">
                <FormData></FormData>
              {data?.map((post) => {
                return (
                  <div className="bg-white shadow-lg rounded-md p-2 cursor-pointer" key={post.id} onClick={()=> navigation(`/${post._id}`)}>
                    <p className="font-semibold font-xl ">PostId  :-{post.title}</p>
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
