import React, { Fragment } from "react";
import { Route } from "vtex.my-account-commons/Router";

import ItapuaLoyalty from "./components/ItapuaLoyalty";
// import ItapuaLoyaltyMock from "./components/ItapuaLoyaltyMock";
// import ExamplePage from "./components/Page";

/* Router */
const ExtensionRouter = () => (
  <Fragment>
    <Route exact path="/itapua-loyalty" component={ItapuaLoyalty} />
  </Fragment>
  // <Fragment>
  //   <Route exact path="/custom-page/:param" component={ExamplePage} />
  // </Fragment>
);

export default ExtensionRouter;
