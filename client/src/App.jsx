import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import EditImage from "./Pages/gallery/EditImage";
import AddImage from "./Pages/gallery/AddImage";
import ShoppingCart from "./Pages/shoppingCart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImage from "./Pages/uploadImage";
import AddProduct from "./Pages/products/AddProduct";
import ConfigureCategory from "./Pages/Category/ConfigureCategory";
import ConfigureCategoryProduct from "./Pages/Category/ConfigureCategoryProduct";
import EditProduct from "./Pages/products/EditProduct";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import OrdersPage from "./Pages/orders";
import OrderPage from "./Pages/orders/Order";
import AboutUs from "./Pages/AboutUs";
import Profile from "./Pages/Profile";
const noRequirement = [
  "/login",
  "/register",
  "/forgot-password",
  "/change-password",
];

function App() {
  const { pathname } = useLocation();
  const { currentUser } = useAuthContext();

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <ShoppingCartProvider>
      <AuthContextProvider>
        {!noRequirement.includes(pathname) && <NavBar />}
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/gallery"
              element={
                <RequiredAuth>
                  <Gallery />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/gallery/:idImage"
              element={
                <RequiredAuth>
                  <ImageGallery />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/gallery/edit_image/:idImage"
              element={
                <RequiredAuth>
                  <EditImage />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/gallery/add_image"
              element={
                <RequiredAuth>
                  <AddImage />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              exact
              path="/shop"
              element={
                <RequiredAuth>
                  <Shop />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/shop/:idProduct"
              element={
                <RequiredAuth>
                  <ProductShop />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/shoppingCart"
              element={
                <RequiredAuth>
                  <ShoppingCart />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/uploadImage"
              element={
                <RequiredAuth>
                  <UploadImage />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/add_product"
              element={
                <RequiredAuth>
                  <AddProduct />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/edit_product/:idProduct"
              element={
                <RequiredAuth>
                  <EditProduct />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/configure_category"
              element={
                <RequiredAuth>
                  <ConfigureCategory />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/configure_category_product"
              element={
                <RequiredAuth>
                  <ConfigureCategoryProduct />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <RequiredAuth>
                  <OrdersPage />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/order/:idOrder"
              element={
                <RequiredAuth>
                  <OrderPage />
                </RequiredAuth>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <RequiredAuth>
                  <Profile />
                </RequiredAuth>
              }
            />
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
      </AuthContextProvider>
    </ShoppingCartProvider>
  );
}

export default App;
