import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'

import ItapuaLoyalty from './components/ItapuaLoyalty'

/* Router */
const ExtensionRouter = () => (
  <Fragment>
    <Route exact path="/itapua-loyalty" component={ItapuaLoyalty} />
  </Fragment>
)

export default ExtensionRouter
