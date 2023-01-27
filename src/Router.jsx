import { Router, createBrowserRouter } from "react-router-dom";
import App from "./App"
import Home from "./pages/Home/Home"
import SinglePost from "./pages/Post/SinglePost";

const Routers = createBrowserRouter([
    {
        path : "/",
        element : <App></App>,
        children : [
            {
                path : "/",
                element : <Home></Home>,
            },
            {
                path : "/:id",
                element : <SinglePost></SinglePost>
            }
        ]
    }
])


export default Routers