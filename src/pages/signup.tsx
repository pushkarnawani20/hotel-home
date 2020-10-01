import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApplicationState, UserSignUpState } from '../lib/appTypes/types';
import { signUpUsers } from '../lib/store/actions/users';
import PageTitle from '../components/PageTitle/page-title';
import TextInput from '../components/TextInput/text-input';
import TextArea from '../components/TextArea/text-area';
import Button from '../components/Button/button';
import { notify, Tost } from '../utils/notify';

const signUpInitialState: UserSignUpState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  address: '',
  pinCode: '',
};
const SignUp: React.FC = () => {
  const [signUpState, setSignUpState] = useState(signUpInitialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorList } = useSelector((state: ApplicationState) => state.users);
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setSignUpState(currentState => ({ ...currentState, [name]: value }));
    },
    [],
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      pinCode,
    } = signUpState;
    const payLoad = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      pinCode,
    };
    dispatch(signUpUsers(payLoad, history));
  };
  useEffect(() => {
    if (errorList.length > 0)
      errorList.map((error: any) =>
        notify(` ${error.feild} --  ${error.message}`),
      );
  }, [errorList]);
  return (
    <div className="sign-in-up-container relative">
      <div className="form-conatiner w-full max-w-md absolute z-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2">
        <h1 className="text-center mb-2 font-extrabold text-white text-xl">
          Join Us
        </h1>
        <form onSubmit={handleOnSubmit}>
          <TextInput
            name="firstName"
            label="First Name"
            value={signUpState.firstName}
            type="text"
            onChange={handleOnChange}
            required
          />
          <TextInput
            name="lastName"
            label="Last Name"
            value={signUpState.lastName}
            type="text"
            onChange={handleOnChange}
            required
          />
          <TextInput
            name="phoneNumber"
            label="Phone Number"
            value={signUpState.phoneNumber}
            type="text"
            onChange={handleOnChange}
            required
          />
          <TextInput
            name="email"
            label="Email"
            value={signUpState.email}
            type="email"
            onChange={handleOnChange}
            required
          />
          <TextInput
            name="password"
            label="Password"
            value={signUpState.password}
            type="password"
            onChange={handleOnChange}
            required
          />
          <TextArea
            name="address"
            onChange={handleOnChange}
            label="Address"
            value={signUpState.address}
            maxLength={150}
            rows={2}
            cols={20}
          />
          <TextInput
            name="pinCode"
            label="Pin Code"
            value={signUpState.pinCode}
            type="text"
            onChange={handleOnChange}
            required
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              buttonStyle="bg-blue-500 text-white font-semibold hover:bg-white hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent"
              buttonSize="w-full"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
      <PageTitle pageName="Welcome | Sign up" />
      <Tost />
    </div>
  );
};

export default SignUp;
