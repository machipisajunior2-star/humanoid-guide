import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Support from "./pages/Support";
import Humanoids from "./pages/Humanoids";
import Category from "./pages/Category";
import Error404 from "./pages/Error404";

function App() {
 let element = useRoutes([
   { path: "/", element: <Home /> },
   { path: "about", element: <About /> },
   { path: "products", element: <Product /> },
   { path: "events", element: <Support /> },
   { path: "contact", element: <Humanoids /> },
   { path: "category", element: <Category /> },
   { path: "*", element: <Error404 /> },
 ]);
 return element;
}

export default App;
