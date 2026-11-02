import React, { useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Support from "./pages/Support";
import Humanoids from "./pages/Humanoids";
import Category from "./pages/Category";
import Search from "./pages/Search"
import Error404 from "./pages/Error404";

function App() {
  const themeColor = useSelector(state => state.themeColor);
  useEffect(() => {
    document.body.style.backgroundColor = themeColor.colorPalette.background;
    document.body.style.color = themeColor.colorPalette.text;
  }, [themeColor]);
 let element = useRoutes([
   { path: "/", element: <Home /> },
   { path: "humanoids", element: <Humanoids /> },
   { path: "search", element: <Search /> },
   { path: "category/:useType", element: <Category /> },
   { path: "product/:productSlag", element: <Product /> },
   { path: "about", element: <About /> },
   { path: "support", element: <Support /> },
   { path: "/404", element: <Error404 /> },
   { path: "*", element: <Navigate to="/404" /> },
 ]);
 return element;
}

export default App;
