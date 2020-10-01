import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../lib/appTypes/types';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import { getOrderDetail } from '../lib/store/actions/orders';
import { tableHead } from '../lib/constant/constant';

const OrderHistory = () => {
  const {
    users,
    hotels: { hotelsData },
    order,
  } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users?.id) {
      const payLoad = {
        userId: users?.id,
      };
      dispatch(getOrderDetail(payLoad));
    }
  }, [users?.id]);

  const getHotelName = (propCode: string) =>
    hotelsData.filter(h => h.propCode === propCode)[0];

  const renderTableHead = () =>
    tableHead?.map(tableHeadName => (
      <th
        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        key={tableHeadName}
      >
        {tableHeadName}
      </th>
    ));

  const renderTableContent = () =>
    order?.details?.map(odr => (
      <tr key={odr.serviceName}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {odr.items.length > 1
            ? `${odr.serviceName} + ${odr.items.length} items`
            : odr.serviceName}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {odr.items.length > 1 ? `food` : odr.serviceType}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {new Date(odr.date).toDateString()}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {odr.amount}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {getHotelName(odr.propCode).hotelName}
        </td>
      </tr>
    ));

  return (
    <>
      <Header />
      <div className="flex flex-col max-w-6xl w-auto mx-auto">
        {users.token ? (
          <>
            <h3 className="text-black text-left font-bold text-2xl uppercase my-5">
              <span>Account Details</span>
            </h3>
            <div>
              <ul className="flex flex-row flex-wrap">
                <li className="w-1/2 mb-2">
                  <strong className="block text-gray-900 text-1xl font-bold mb-1">
                    Name:
                  </strong>
                  <span>{users.fullName}</span>
                </li>
                <li className="w-1/2 mb-2">
                  <strong className="block text-gray-900 text-1xl font-bold mb-1">
                    Email:
                  </strong>
                  <span>{users.email}</span>
                </li>
                <li className="w-1/2 mb-2">
                  <strong className="block text-gray-900 text-1xl font-bold mb-1">
                    Phone Number:
                  </strong>
                  <span>{users.phoneNumber}</span>
                </li>
                <li className="w-1/2 mb-2">
                  <strong className="block text-gray-900 text-1xl font-bold mb-1">
                    Address:
                  </strong>
                  <span>{users.address}</span>
                </li>
                <li className="w-1/2 mb-2">
                  <strong className="block text-gray-900 text-1xl font-bold mb-1">
                    PinCode:
                  </strong>
                  <span>{users.pinCode}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-black text-left font-bold text-2xl uppercase my-5">
                <span>Order Details</span>
              </h3>
              <div className="flex justify-center">
                {order?.details?.length > 0 && (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>{renderTableHead()}</tr>
                    </thead>
                    <tbody>{renderTableContent()}</tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="confirmation w-full bg-white py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="flex-col flex error">
                <span>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-bold mt-4">
                  Looks like you are not login!
                </span>
              </h2>
              <p className="mt-6">
                <span>Please</span>
                <Link to="/signin" className="font-semibold underline mx-1">
                  Click here
                </Link>
                <span>to see your Orders and Account Details</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
