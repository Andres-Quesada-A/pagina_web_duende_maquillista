import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Error404 from "./Pages/Error404";
import Footer from "./components/footer";
import ChangePasswordPage from "./Pages/ChangePassword";
import Shop from "./Pages/shop/index";
import ProductShop from "./Pages/shop/Product";
import Gallery from "./Pages/gallery";
import ImageGallery from "./Pages/gallery/Image";
import ShoppingCart from "./Pages/shoppingCart";

const noRequirement = [
  "/login",
  "/register",
  "/forgot-password",
  "/change-password",
];

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!noRequirement.includes(pathname) && <NavBar />}
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/gallery/:idImage" element={<ImageGallery />} />
          <Route
            exact
            path="/change-password"
            element={<ChangePasswordPage />}
          />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/shop/:idProduct" element={<ProductShop />} />
          <Route exact path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ScrollToTop>

      <Footer />
    </>
  );
}

export default App;
