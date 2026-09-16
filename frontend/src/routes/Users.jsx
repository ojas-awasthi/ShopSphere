import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch ,Route , useLocation } from "react-router-dom";
import Header from "../components/layouts/header1.jsx/Header";
import Footer from "../components/layouts/footer/Footer";
import Services from "../terms&conditions/Service";
import Home from "../components/home/Home";
import ProductDetails from "../components/product/ProductDetails";
import Products from "../components/product/Products";
import Shipping from "../components/cart/Shipping";
import Cart from "../components/cart/Cart";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import Payment from "../components/cart/Payment";
import OrderSuccess from "../components/cart/OrderSuccess";
import MyOrder from "../components/order/MyOrder";
import ContactForm from "../terms&conditions/Contact";
import AboutUsPage from "../terms&conditions/Aboutus";
import ReturnPolicyPage from "../terms&conditions/Return";
import TermsUse from "../terms&conditions/TermsAndUse";
import TermsAndConditions from "../terms&conditions/TermsCondtion";
import PrivacyPolicy from "../terms&conditions/Privacy";
import Signup from "../components/user/SignUp";
import Login from "../components/user/Login";
import Profile from "../components/user/Profile";
import PrivateRoute from "../components/route/PrivateRoute";
import UpdatePassword from "../components/user/UpdatePassword";
import ForgetPassword from "../components/user/ForgetPassword";
import ResetPassword from "../components/user/ResetPassword";
import UpdateProfile from "../components/user/UpdateProfile";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "../actions/userAction"
function Users() {
   const location = useLocation();
   const [isAdminRoute, setIsAdminRoute] = useState(false);
        const dispatch = useDispatch();


  useEffect(
    () => {
      if (location.pathname.startsWith("/admin")) {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    },
    [location.pathname],
    isAdminRoute
  );

  
  useEffect(() => {
    // this is for user data load for profile section if user logged in
    dispatch(load_UserProfile());

  
  }, []);

    return (
      <>
        <Router>
          {isAdminRoute ? null : <Header />}
          <PrivateRoute exact path="/process/payment" component={Payment} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/product/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/products/:keyword">
              <Products />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/password/forgot">
              <ForgetPassword />
            </Route>
            <Route exact path="/password/reset/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>

            <Route exact path="/policy/return">
              <ReturnPolicyPage />
            </Route>
            <Route exact path="/policy/Terms">
              <TermsUse />
            </Route>
            <Route exact path="/policy/privacy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/terms/conditions">
              <TermsAndConditions />
            </Route>
            <Route exact path="/contact">
              <ContactForm />
            </Route>
            <Route exact path="/about_us">
              <AboutUsPage />
            </Route>

            <PrivateRoute exact path="/account" component={Profile} />
            <PrivateRoute
              exact
              path="/profile/update"
              component={UpdateProfile}
            />
            <PrivateRoute
              exact
              path="/password/update"
              component={UpdatePassword}
            />

            <PrivateRoute exact path="/orders" component={MyOrder} />
            <PrivateRoute exact path="/shipping" component={Shipping} />
            <PrivateRoute
              exact
              path="/order/confirm"
              component={ConfirmOrder}
            />
            <PrivateRoute exact path="/success" component={OrderSuccess} />
          </Switch>

          <Services />
          <Footer />
        </Router>
      </>
    );
}

export default Users
 