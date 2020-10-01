import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  pageName: string;
}

const PageTitle: React.FC<Props> = ({ pageName }): React.ReactElement => {
  return (
    <Helmet>
      <title>{pageName}</title>
    </Helmet>
  );
};

export default PageTitle;
