import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    if (location.pathname === "/404") {
      return null;
    }
    return (
        <h1>Footer</h1>
    )
}