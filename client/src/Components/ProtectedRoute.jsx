import React from "react";
import Login from "./Login";
import { loginStore } from "../Stores/loginStore";
import { Outlet } from "react-router-dom"
import BookShelf from "./BookShelf"

export default function ProtectedRoute() {
  const { token } = loginStore((state) => state);
  return token ? <Outlet /> : <Login />;
}