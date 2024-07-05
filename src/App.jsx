import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Layout/Header/Header";
import { LazyPageWrapper } from "./Components/Common/LazyPageWrapper/LazyPageWrapper";
import { lazy } from "react";
import { Footer } from "./Components/Layout/Footer/Footer";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
// ?? not found page
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));
// ?? Landing
const Landing = lazy(() => import("./Pages/Landing/Index"));
// ?? Auth
// **Login
const Login = lazy(() => import("./Pages/Auth/Login/Index"));
const Register = lazy(() => import("./Pages/Auth/Register/Index"));
// ?? Products
const Product = lazy(() => import("./Pages/Product[id]/Index"));
const Products = lazy(() => import("./Pages/Products/Index"));
// ?? Shopping Cart
const ShoppingCart = lazy(() => import("./Pages/ShoppingCart/Index"));
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <LazyPageWrapper>
              <Login />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <LazyPageWrapper>
              <Register />
            </LazyPageWrapper>
          }
        />
        <Route
          path="/"
          element={
            <LazyPageWrapper>
              <Landing />
              <Footer />
            </LazyPageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <LazyPageWrapper>
              <PageNotFound />
              <Footer />
            </LazyPageWrapper>
          }
        />
        <Route path="products">
          <Route
            index
            element={
              <LazyPageWrapper>
                <Products />
              </LazyPageWrapper>
            }
          />
          <Route
            path=":productId"
            element={
              <LazyPageWrapper>
                <Product />
              </LazyPageWrapper>
            }
          />
        </Route>
        <Route
          path="shopping-cart"
          element={
            <ProtectedRoute
              from="shopping-cart"
              message="لازم تسجل دخولك عشان تقدر تفعل الاوردرات وتستمتع باقوي الخصومات"
            >
              <LazyPageWrapper>
                <ShoppingCart />
              </LazyPageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
