import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchHotels } from '../lib/store/actions/hotels';
import Hotel from './hotels';
import Spa from './spa';
import Restaurants from './restaurants';
import Meals from './meals';
import Laundry from './laundry';
import Chefs from './chefs';
import SignIn from './signin';
import SignUp from './signup';
import Home from './home';
import Events from './events';
import Checkout from './checkout';
import EventCheckout from './eventCheckout';
import Confirmation from './confirmation';
import OrderHistory from './orderHistory';
import { clearCart } from '../lib/store/actions/cart';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(clearCart());
  }, [dispatch]);
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/hotels/:propCode" component={Hotel} />
        <Route
          exact
          path="/hotels/:propCode/restaurants"
          component={Restaurants}
        />
        <Route
          exact
          path="/hotels/:propCode/restaurants/mealMenu"
          component={Meals}
        />
        <Route exact path="/hotels/:propCode/spa" component={Spa} />
        <Route exact path="/hotels/:propCode/laundry" component={Laundry} />
        <Route exact path="/hotels/:propCode/chef" component={Chefs} />
        <Route exact path="/hotels/:propCode/events" component={Events} />
        <Route
          exact
          path="/hotels/:propCode/events/events-checkout"
          component={EventCheckout}
        />
        <Route exact path="/hotels/:propCode/checkout" component={Checkout} />
        <Route
          exact
          path="/hotels/:propCode/confirmation"
          component={Confirmation}
        />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/orders" component={OrderHistory} />
      </Switch>
    </>
  );
};

export default App;
