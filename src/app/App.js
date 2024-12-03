import "./App.css";
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import MarketplacePage from "../pages/marketplacePage/MarketplacePage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import GamePage from "../pages/gamePage/GamePage";
import LoginPage from "../pages/loginPage/LoginPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "../widgets/layout/Layout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCreationPage from "../pages/admin/courseCreationPage/CourseCreationPage";
import CourseManagingPage from "../pages/admin/courseManagingPage/CourseManagingPage";
import CourseDetailsPage from "../pages/courseDetailsPage/CourseDetailsPage";
import LandingPage from "../pages/landingPage/LandingPage";
import SuccessPayment from "../pages/successPayment/SuccessPayment";
import UnSuccessPayment from "../pages/unsuccessPayment/UnSuccessPayment";
import SubscriptionPage from "../pages/subscriptionPage/SubscriptionPage";
import RegisterForm from "../widgets/registerForm/RegisterForm";
import WalletPage from "../pages/walletPage/WalletPage";
import CertificateForm from "../widgets/certificateForm/CertificateForm";
import BadgeForm from "../widgets/badgeForm/BadgeForm";



const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/price-list",
        element: <SubscriptionPage></SubscriptionPage>,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: (
          //<RequireAuth roles={["ROLE_USER"]}>
          <DashboardPage />
          //</RequireAuth>
        ),
      },
      {
        path: "/marketplace",
        element: (
          //<RequireAuth roles={["ROLE_USER"]}>
          <MarketplacePage />
          //</RequireAuth>
        ),
      },
      {
        path: "/simulate",
        element: (
          //<RequireAuth roles={["ROLE_USER"]}>
          <GamePage />
          //</RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          //<RequireAuth roles={["ROLE_USER"]}>
          <ProfilePage />
          //</RequireAuth>
        ),
      },
      {
        path: "/course/:courseId",
        element: (
          //<RequireAuth roles={["ROLE_USER"]}>
          <CourseDetailsPage />
          //</RequireAuth>
        ),
      },
      {
        path: "/dashboard-admin",
        element: (
          //<RequireAuth roles={["ROLE_ADMIN"]}>
          <CourseManagingPage />
          //</RequireAuth>
        ),
      },
      {
        path: "/course",
        element: (
          //<RequireAuth roles={["ROLE_ADMIN"]}>
          <CourseCreationPage />
          //</RequireAuth>
        ),
      },
      {
        path: '/wallet',
        element: (
          //<RequireAuth roles={["ROLE_ADMIN"]}>
          <WalletPage />
          //</RequireAuth>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/success",
        element: <SuccessPayment />,
      },
      {
        path: "/unsuccess",
        element: <UnSuccessPayment />,
      },
      {
        path: "/certificate",
        element: <CertificateForm />,
      },
      {
        path: "/badge",
        element: <BadgeForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
