import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../lib/appTypes/types';
import { loginIn } from '../lib/store/actions/users';
import PageTitle from '../components/PageTitle/page-title';
import TextInput from '../components/TextInput/text-input';
import Button from '../components/Button/button';
import { Tost, notify } from '../utils/notify';

const loginInitialState = {
  email: '',
  password: '',
};

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { errorList } = useSelector((state: ApplicationState) => state.users);
  const [loginState, setLoginState] = useState(loginInitialState);
  const history = useHistory();

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setLoginState(currentState => ({ ...currentState, [name]: value }));
    },
    [],
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = loginState;
    const payLoad = {
      email,
      password,
    };
    dispatch(loginIn(payLoad, history));
  };

  useEffect(() => {
    if (errorList.length > 0) errorList.map(error => notify(error));
  }, [errorList]);

  return (
    <div className="sign-in-up-container relative">
      <a href="./" className="absolute back_to_link font-bold">
        <i className="fa fa-home fa-lg" />
      </a>
      <div className="form-conatiner w-full max-w-sm absolute z-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center mb-2 font-extrabold text-white text-xl">
          Log In
        </h1>
        <div className="p-4 text-center font-bold text-white">
          <i className="fa fa-lock" aria-hidden="true" />
        </div>
        <form onSubmit={handleOnSubmit}>
          <TextInput
            name="email"
            label="Username"
            value={loginState.email}
            type="email"
            onChange={handleOnChange}
            required
          />
          <TextInput
            name="password"
            label="Password"
            value={loginState.password}
            type="password"
            onChange={handleOnChange}
            required
          />
          <p className="flex justify-between flex-wrap text-white">
            <span>Not a member?</span>
            <Link to="/signup" className="text-white underline">
              Sign Up
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              buttonStyle="bg-blue-500 text-white font-semibold hover:bg-white hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent"
              buttonSize="w-full"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
      <PageTitle pageName="Welcome to hotelname | Sign In" />
      <Tost />
    </div>
  );
};

export default SignIn;
