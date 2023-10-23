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
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./Pages/uploadImage";
import AddProduct from "./Pages/products/AddProduct";
import ConfigureCategory from "./Pages/Category/ConfigureCategory";
import ConfigureCategoryProduct from "./Pages/Category/ConfigureCategoryProduct";

const noRequirement = [
  "/login",
  "/register",
  "/forgot-password",
  "/change-password",
];

function App() {
  const { pathname } = useLocation();

  return (
      <ShoppingCartProvider>
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
            <Route exact path="/uploadImage" element={<UploadImage />} />
            <Route exact path="/add_product" element={<AddProduct />} />
            <Route exact path="/configure_category" element={<ConfigureCategory />} />
            <Route exact path="/configure_category_product" element={<ConfigureCategoryProduct />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ScrollToTop>

        <Footer />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </ShoppingCartProvider>
  );
}

export default App;
