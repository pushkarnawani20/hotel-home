import {
  LOGIN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CLEAR_ERROR,
  ADD_HOTELS,
  ADD_SINGLE_HOTEL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_SELECTED_SERVICE,
  CLEAR_CART,
  SIGN_OUT,
  LOADING,
  GET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS,
} from '../store/types/types';

// Application state
export interface Hotels {
  propCode: string;
  hotelName: string;
  hotelCountry: string;
  hotelCity: string;
  rating: number;
  hotelImage: [];
  openingHours: string;
}

export interface CommonTypes {
  _id: string;
  name: string;
  description: string;
  rating: number;
  bestsellers: boolean;
  image: string;
}
interface SpaType extends CommonTypes {
  price: number;
  bestsellers: boolean;
  spaCategory: string;
  intensity: string;
  totalTime: string;
  benefits: string[];
  includes: string[];
}
interface LaundryType extends CommonTypes {
  itemName: string;
  serviceType: string;
  perkg: boolean;
  price: number;
}

interface ChefsType extends CommonTypes {
  type: string;
  experience: string;
  cookingStyle: string[];
  signatureDishes: string[];
}
interface MealsType extends CommonTypes {
  price: number;
  foodType: string;
  foodCategory: string;
}
export interface RestaurantsType extends CommonTypes {
  type: string;
  meals: MealsType[];
}
export interface SelectedHotel extends Hotels {
  hotelDescription: string;
  hotelAddress: string;
  rating: number;
  openingHours: string;
  hotelImage: [];
  spa: SpaType[];
  restaurants: RestaurantsType[];
  laundry: LaundryType[];
  chefs: ChefsType[];
}

export type CommonServiceType = SpaType &
  LaundryType &
  ChefsType &
  RestaurantsType;

export interface HotelsProps {
  hotelsData: Hotels[];
  selectedHotel: SelectedHotel;
  selectedService: string | undefined;
  isLoading: boolean;
}
export interface UserLoginState {
  email: string;
  password: string;
}

export interface UserSignUpState extends UserLoginState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  pinCode: string;
}
export interface UserState {
  fullName: string | undefined;
  id: string | undefined;
  email: string | undefined;
  token: string;
  phoneNumber: string | undefined;
  address: string | undefined;
  pinCode: string | undefined;
  errorList: [];
}

export interface CartState {
  CartItems: any[];
}

export interface OrderState {
  details: any[];
}
export interface ApplicationState {
  hotels: HotelsProps;
  users: UserState;
  carts: CartState;
  order: OrderState;
}

// Action state
interface SignUpError {
  type: typeof SIGNUP_ERROR;
  payLoad: any;
}

interface SignIn {
  type: typeof LOGIN;
  payLoad: any;
}
interface SignOut {
  type: typeof SIGN_OUT;
}
interface SignInError {
  type: typeof LOGIN_ERROR;
  payLoad: any;
}
interface ClearSignInAndSignUpError {
  type: typeof CLEAR_ERROR;
  payLoad: null;
}
interface LoadingState {
  type: typeof LOADING;
  payLoad: boolean;
}
interface AddHotels {
  type: typeof ADD_HOTELS;
  payLoad: any;
}
interface AddSingleHotels {
  type: typeof ADD_SINGLE_HOTEL;
  payLoad: any;
}
interface AddIteamToCart {
  type: typeof ADD_TO_CART;
  payLoad: any;
}
interface RemoveIteamFromCart {
  type: typeof REMOVE_FROM_CART;
  payLoad: any;
}
interface ClearCart {
  type: typeof CLEAR_CART;
}

interface SetSelectedService {
  type: typeof SET_SELECTED_SERVICE;
  payLoad: string;
}

export type UserActionTypes =
  | SignIn
  | SignInError
  | SignUpError
  | ClearSignInAndSignUpError
  | SignOut;

export type HotelsActionTypes =
  | AddHotels
  | AddSingleHotels
  | SetSelectedService
  | LoadingState;

type GetOrderDetail = {
  type: typeof GET_ORDER_DETAILS;
  payLoad: any;
};
type ClearOrder = {
  type: typeof CLEAR_ORDER_DETAILS;
};

export type OrderActionTypes = GetOrderDetail | ClearOrder;

export type CartActionTypes = AddIteamToCart | RemoveIteamFromCart | ClearCart;
