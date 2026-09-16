import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  
} from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import ProductList from "../components/admin/ProductList";
import OrderList from "../components/admin/OrderList";
import UserList from "../components/admin/UserList";
import UpdateProduct from "../components/admin/UpdateProduct";
import ProcessOrder from "../components/admin/ProcessOrder";
import UpdateUser from "../components/admin/UpdateUser";
import NewProduct from "../components/admin/NewProduct";
import ProductReviews from "../components/admin/ProductReviews";
import PrivateRoute from "../components/route/PrivateRoute";

const Admin = () => {
     
    return (
      
        <Router>
            <Switch>
             <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/product"
            component={NewProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UserList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
            </Switch>
        </Router>
    
    );
    }
export default Admin;