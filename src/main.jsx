import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "../error-page";
import NewChat from "./pages/NewChat";
import Conversations from "./pages/Conversations";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<Root /> errorElement=<ErrorPage />>
      <Route errorElement={<ErrorPage />}>
        <Route index element=<NewChat /> />
        <Route path="/conversations" element=<Conversations /> />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
