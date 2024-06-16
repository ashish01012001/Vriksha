import React, { lazy, Suspense, useState} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/loader/loader";
import { imgPageLoader } from "./pages/NewID";
import { plantDetailLoader } from "./pages/PlantDetail";
import { plantsLoader } from "./pages/MyPlants";
import { profileLoader } from "./pages/MyProfile";
import { plantHealthLoader } from "./pages/PlantHealth";
import { homeLoader } from "./pages/Home";
import UserInfo from "./store/user-info";
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const MyPlants = lazy(() => import("./pages/MyPlants"));
const PlantDetail = lazy(() => import("./pages/PlantDetail"));
const NewID = lazy(() => import("./pages/NewID"));
const LogIn = lazy(() => import("./pages/LogIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Error = lazy(() => import("./pages/Error"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const PlantHealth = lazy(() => import("./pages/PlantHealth"));
function App() {
  
  const [profileImg, setProfileImg] = useState("https://cdn-icons-png.flaticon.com/512/3682/3682281.png");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleImg = (url) => {
    setProfileImg(url);
  };
  const handleLog = (value) => {
    setIsLoggedIn(value);
  };
  
  const userInfo = {
    isLoggedIn: isLoggedIn,
    profileImg: profileImg,
    changeImg: handleImg,
    changeLog: handleLog,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          index: "true",
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "newID",
          element: <NewID />,
          loader:imgPageLoader
        },
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
          loader: profileLoader,
        },
        {
          path: "myplants",
          element: <MyPlants />,
          loader: plantsLoader,
        },
        {
          path: "myplants/health/:accessToken",
          element: <PlantHealth />,
          loader: plantHealthLoader,
        },
        {
          path: "myplants/:accessToken",
          element: <PlantDetail />,
          loader: plantDetailLoader,
        },
      ],
    },
  ]);
  return (
    <>
      <UserInfo.Provider value={userInfo}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </UserInfo.Provider>
    </>
  );
}

export default App;
