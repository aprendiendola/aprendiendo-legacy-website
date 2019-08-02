import React from 'react';
import { Link } from 'routes';
import service from 'services';

const getNewPath = query => {
  let newPath = '';
  if (query) {
    Object.keys(query).map(key => {
      if (key) {
        newPath = `${newPath}/${query[key]}`;
      }
    });
  }
  return newPath;
};

const CustomLink = ({ children, path }) => {
  const country = service.getCountry();

  if (typeof path === 'string') {
    return (
      <Link route={`/${country.countryCode}${path}`} prefetch>
        {children}
      </Link>
    );
  }

  const { pathname, query } = path;
  return (
    <Link
      href={{
        pathname: `/${country.countryCode}${pathname}`,
        query
      }}
      as={{
        pathname: getNewPath(query)
      }}
      prefetch
    >
      {children}
    </Link>
  );
};

export default CustomLink;
