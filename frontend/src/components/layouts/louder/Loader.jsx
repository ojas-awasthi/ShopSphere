import React from "react";
import { ReactComponent as LoaderGraphic } from "../../../image/louder-svg/LoaderBlack.svg";
import "./Loader.css";

const ShopSphereLoader = () => (
  <div className="shopsphere-loader">
    <LoaderGraphic className="spinner" />
  </div>
);

export default ShopSphereLoader;
