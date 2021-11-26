import React from "react";
import Link from "../components/Link";

function ListView(props) {
  const { filterRoutes } = props;
  return (
    <ul>
      {filterRoutes.map((filterRoute) => (
        <li>
          <Link to={filterRoute.route}>{filterRoute.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ListView;
