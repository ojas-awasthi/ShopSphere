import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography, Button, Paper, Divider } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CheckoutSteps from "./CheckoutSteps ";
import MetaData from "../layouts/matadata/MataData";
import Loader from "../layouts/louder/Loader";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { clearCart } from "../../actions/cartAction";
import "./Cart.css";

const PaymentComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.newOrder);
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const shippingPrice = subtotal > 1000 ? 0 : 99;
  const taxPrice = Number((subtotal * 0.18).toFixed(2));
  const totalPrice = Number((subtotal + taxPrice + shippingPrice).toFixed(2));

  const address = `${shippingInfo.address || ""}, ${shippingInfo.city || ""}, ${shippingInfo.state || ""}, ${shippingInfo.pinCode || ""}, ${shippingInfo.country || "India"}`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const placeOrderHandler = async () => {
    if (!cartItems.length) {
      alert.error("Your cart is empty.");
      history.push("/cart");
      return;
    }

    setPlacingOrder(true);
    const order = {
      shippingInfo,
      orderItems: cartItems,
      paymentInfo: { id: "COD", status: "pending" },
      itemsPrice: subtotal,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      await dispatch(createOrder(order));
      dispatch(clearCart());
      sessionStorage.removeItem("orderInfo");
      alert.success("Order placed successfully!");
      history.push("/success");
    } catch (err) {
      alert.error(err.response?.data?.message || err.message || "Unable to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading && !placingOrder) return <Loader />;

  return (
    <>
      <MetaData title="Place Order" />
      <CheckoutSteps activeStep={2} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem 5rem" }}>
        <Paper elevation={2} style={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>Order & Payment</Typography>
          <Typography variant="body1" style={{ marginBottom: "1.5rem" }}>
            Pay safely in cash when your ShopSphere order is delivered. No online payment is required.
          </Typography>

          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "1rem", background: "#f5f5f5", marginBottom: "1.5rem" }}>
            <LocalShippingIcon fontSize="large" />
            <div>
              <Typography variant="h6">Cash on Delivery</Typography>
              <Typography variant="body2">Your order will be confirmed now and payment will be collected at delivery.</Typography>
            </div>
          </div>

          <Typography variant="h6" gutterBottom>Delivery Address</Typography>
          <Typography variant="body2" paragraph>{user?.name}</Typography>
          <Typography variant="body2" paragraph>{address}</Typography>
          <Typography variant="body2" paragraph>{shippingInfo.phoneNo} · {shippingInfo.email || user?.email}</Typography>

          <Divider style={{ margin: "1.5rem 0" }} />
          <Typography variant="h6" gutterBottom>Order Summary</Typography>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0.6rem 0" }}><span>Subtotal</span><b>₹{subtotal.toFixed(2)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0.6rem 0" }}><span>GST</span><b>₹{taxPrice.toFixed(2)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0.6rem 0" }}><span>Shipping</span><b>{shippingPrice === 0 ? "FREE" : `₹${shippingPrice.toFixed(2)}`}</b></div>
          <Divider style={{ margin: "1rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem" }}><b>Total</b><b>₹{totalPrice.toFixed(2)}</b></div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={placingOrder}
            onClick={placeOrderHandler}
            style={{ marginTop: "2rem", padding: "0.9rem", background: "#000", color: "#fff" }}
          >
            {placingOrder ? "Placing Order..." : "Place Order — Cash on Delivery"}
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default PaymentComponent;
