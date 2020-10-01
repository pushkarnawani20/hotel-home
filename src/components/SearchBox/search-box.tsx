import React from 'react';

interface Props {
  inputVal: string;
  onInputChangeHandler: (evt: any) => void;
  onSearchClickHandler: (evt: any) => void;
}

const SearchBox: React.FC<Props> = (props: Props): React.ReactElement => {
  const { onSearchClickHandler, inputVal, onInputChangeHandler } = props;
  return (
    <>
      <input
        type="text"
        className="searchTerm"
        placeholder="Find a hotel nearby.."
        value={inputVal}
        onChange={onInputChangeHandler}
      />
      <button
        type="submit"
        className="searchButton"
        onClick={onSearchClickHandler}
      >
        <i className="fa fa-search" />
      </button>
    </>
  );
};

export default SearchBox;
