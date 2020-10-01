import * as React from 'react';

interface Props {
  searchTerm: string;
}

const NoSearchWrap: React.FC<Props> = (props: Props): React.ReactElement => {
  const { searchTerm } = props;
  return (
    <div className="no-search-box">
      <h1>
        <span>{`We could not find anything for "${searchTerm}".`}</span>
      </h1>
    </div>
  );
};

export default NoSearchWrap;
