import React from 'react';
import ReactDOM from 'react-dom/client'
import Root from "./routes/Root.jsx";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App";
import World from './components/World/World.jsx';
import Create from "./components/Create/Create.jsx";
import Customize from "./components/Create/Cutomize.jsx";
import Zone1 from './components/Zones/Zone1.jsx';
import Clock from './components/Pages/Clock.jsx';




const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      { path:"/", element:<App/>},
      { path:"/world", element:<World/>},
      { path:"/creando", element:<Create/>},
      { path:"/customizando", element:<Customize/>},
      { path:"/zona1", element:<Zone1/>},
      { path:"/transitos", element:<Clock/>},



      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);