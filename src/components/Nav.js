import React from "react";
import { useLocation } from "react-router-dom"

export default function Nav() {
    const location = useLocation();
    if (location.pathname === '/404') {
        return null
    }
    return (
        <h1>HUMANOIDS</h1>
    )
}