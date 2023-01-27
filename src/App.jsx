import React from 'react'
import {Outlet} from "react-router-dom"
import {ReactQueryDevtools} from "react-query/devtools"

const App = () => {
  return (
    <>
    <Outlet></Outlet>
    <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'}></ReactQueryDevtools>
    </>
  )
}

export default App