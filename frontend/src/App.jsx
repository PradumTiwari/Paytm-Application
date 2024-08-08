import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './components/DashBoard'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import SendMoney from './components/SendMoney'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashBoard/>,
    },
    {
      path: "/signup",
      element: <SignUp />,

    }
    ,
    {
      path: "/signin",
      element: <SignIn />,

    },
    {
      path: "/sendmoney",
      element: <SendMoney />,
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
