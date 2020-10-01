import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './header.css';
import { ApplicationState } from '../../lib/appTypes/types';
import Button from '../Button/button';
import { signOut } from '../../lib/store/actions/users';

const Header: React.FC = (): React.ReactElement => {
  const { carts, users } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  const toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const onLogOut = () => {
    dispatch(signOut());
  };
  const withAuth = () => {
    return (
      <ul className="toolbar list-reset lg:flex justify-end flex-1 items-center">
        <li className="pl-3 pr-3 relative">
          <p className="font-semibold headerLinks">
            {`Hi, ${toTitleCase(users.fullName)}`}
          </p>
        </li>
        <li className="pl-3 pr-3 relative headerLinks">
          <Link to="/orders" className="font-semibold">
            My Orders
          </Link>
        </li>
        <li className="pl-3 pr-3 relative headerLinks">
          <Button
            type="button"
            onClick={onLogOut}
            buttonSize="font-semibold"
            buttonStyle=""
          >
            Sign Out
          </Button>
        </li>
        {carts?.CartItems?.length > 0 ? (
          <li className="pl-3 relative">
            <a href="/" className="font-semibold">
              <i className="fa fa-shopping-cart" aria-hidden="true" />
            </a>
          </li>
        ) : null}
      </ul>
    );
  };

  const withoutAuth = () => {
    return (
      <ul className="toolbar list-reset lg:flex justify-end flex-1 items-center">
        <li className="pl-3 pr-3 relative headerLinks">
          <Link to="/signin" className="font-semibold">
            Login
          </Link>
        </li>
        <li className="pl-3 pr-3 relative headerLinks">
          <Link to="/signup" className="font-semibold">
            Join Us
          </Link>
        </li>
        {carts?.CartItems?.length > 0 ? (
          <li className="pl-3 relative">
            <a href="/" className="font-semibold">
              <i className="fa fa-shopping-cart" aria-hidden="true" />
            </a>
          </li>
        ) : null}
      </ul>
    );
  };

  return (
    <header className="header pt-6 pb-4 sticky">
      <div className="box flex justify-between flex-wrap max-w-6xl w-auto mx-auto">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" id="logo">
            <img
              src={require('../../assets/images/hotel-logo.png')}
              alt="logo"
            />
          </Link>
        </div>
        {/* below div is experimental - remove if not needed */}
        <div className="inline-block dropdown relative lg:hidden">
          <button type="button" className="flex items-center px-3 py-2">
            <svg className="fill-current h-3 w-3">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto pt-6 lg:pt-0 hidden">
          {users.token ? withAuth() : withoutAuth()}
        </div>
      </div>
    </header>
  );
};

export default Header;
