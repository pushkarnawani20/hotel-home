import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle/page-title";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import SearchBox from "../components/SearchBox/search-box";
import SearchResult from "../components/SearchResultBox/search-result";
import NoSearchWrap from "../components/NoSearchResWrap/no-search-res";
import { ApplicationState, Hotels } from "../lib/appTypes/types";

const Home = () => {
  const { hotelsData } = useSelector((state: ApplicationState) => state.hotels);
  const [userVal, setUserVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Hotels[]>([]);

  const filterResults = () => {
    const newlyDisplayed: Hotels[] = hotelsData
      .filter(
        hotel =>
          (hotel.hotelName &&
            hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          hotel.hotelCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.hotelCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.propCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const firstName = a.hotelName ? a.hotelName.toUpperCase() : "";
        const secondName = b.hotelName ? b.hotelName.toUpperCase() : "";
        if (firstName < secondName) {
          return 1;
        }
        if (firstName > secondName) {
          return -1;
        }
        return 0;
      });

    setSearchResults(newlyDisplayed);
  };

  const handleKeyPress = event => {
    const { keyCode } = event;
    if (keyCode === 13 && userVal) {
      setSearchTerm(userVal);
    }
  };

  const SearchResultsWrap = useMemo(() => {
    return (
      <>
        <h3>{`Results for "${searchTerm}"-`}</h3>
        <section className="search-list flex flex-wrap justify-start mt-10">
          {searchResults.map((res: any) => (
            <SearchResult
              key={res.propCode}
              {...res}
              hotelImage={res.hotelImage[0]}
            />
          ))}
        </section>
      </>
    );
  }, [searchResults]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const val = evt.target.value;
    setUserVal(val);
  };

  const onInputValSubmit = () => {
    const val = userVal;
    setSearchTerm(val);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (hotelsData && hotelsData.length > 0 && searchTerm) {
      filterResults();
      const elem = document.getElementById("mainWrap") as HTMLElement;
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [searchTerm]);

  return (
    <>
      <Header />
      <PageTitle pageName="Welcome to Innov Hotels App" />
      <section className="intro flex justify-space-between relative">
        <section className="background w-full self-start" />
        <section className="content flex flex-col">
          <div className="top-sec flex flex-wrap mt-4 mb-16">
            <h1>
              Get your favourite hotel services delivered at your doorstep
            </h1>
          </div>
          <div className="bottom-sec flex flex-row justify-evenly items-center">
            <span>
              <i className="fas fa-pizza-slice" />
            </span>
            <span>
              <i className="fas fa-tshirt" />
            </span>
            <span>
              <i className="fas fa-spa" />
            </span>
            <span>
              <i className="fas fa-glass-cheers" />
            </span>
            <span>
              <i className="fas fa-birthday-cake" />
            </span>
          </div>
        </section>
        <section className="home-gallery-container absolute">
          <section className="home-gallery grid">
            <figure className="home-gallery__item gallery__item1">
              <img
                src={require(`../assets/images/home/hotel-innov-spa.jpg`)}
                alt="Gallery 1"
                className="gallery__img"
              />
            </figure>
            <figure className="home-gallery__item gallery__item2">
              <img
                src={require("../assets/images/home/hotel-innov-laundry-2.jpg")}
                alt="Gallery 2"
                className="gallery__img"
              />
            </figure>
            <figure className="home-gallery__item gallery__item3">
              <img
                src={require(`../assets/images/home/hotel-innov-chef.jpg`)}
                alt="Gallery 3"
                className="gallery__img"
              />
            </figure>
            <figure className="home-gallery__item gallery__item4">
              <img
                src={require(`../assets/images/home/hotel-food-innov-1.jpg`)}
                alt="Gallery 4"
                className="gallery__img"
              />
            </figure>
            <figure className="home-gallery__item gallery__item5">
              <img
                src={require("../assets/images/home/hotel-innov-bar-1.jpg")}
                alt="Gallery 5"
                className="gallery__img"
              />
            </figure>
            <figure className="home-gallery__item gallery__item6">
              <img
                src={require(`../assets/images/home/hotel-innov-evt-3.jpg`)}
                alt="Gallery 6"
                className="gallery__img"
              />
            </figure>
          </section>
        </section>
      </section>
      <section className="search-box-wrap absolute flex justify-start p-5">
        <div className="search-bar">
          <SearchBox
            inputVal={userVal}
            onInputChangeHandler={onInputChange}
            onSearchClickHandler={onInputValSubmit}
          />
        </div>
      </section>
      {userVal && (
        <section
          id="mainWrap"
          className="main-wrapper max-w-screen-xl w-11/12 m-auto"
        >
          <section className="search relative">
            <section className="wrap flex flex-col mt-4">
              <section className="flex flex-col pt-4 pl-5 search-list-container">
                {searchTerm &&
                  (searchResults && searchResults.length > 0 ? (
                    SearchResultsWrap
                  ) : (
                    <NoSearchWrap searchTerm={searchTerm} />
                  ))}
              </section>
            </section>
          </section>
        </section>
      )}
      {userVal && <Footer />}
    </>
  );
};

export default Home;
