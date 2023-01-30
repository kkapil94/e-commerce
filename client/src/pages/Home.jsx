import React, { Fragment } from "react";
import HomePoster from "../components/HomePoster";
import Products from "../components/HomeProduct";

export default function Home() {
  return (
    <Fragment>
      <HomePoster />
      <Products />
    </Fragment>
  );
}
