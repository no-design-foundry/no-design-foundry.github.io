import React from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";
import { fontPreviewContainerRule } from "./ListView";

const containerRule = ({navHeight}) => ({
    marginTop: `${navHeight}px`
})

function ListViewOverlay(props) {
  const { filterRoutes, navHeight, fontSize } = props;
  const { css } = useFela({navHeight, fontSize})
  return (
    <ul className={css(containerRule)}>
      {filterRoutes.map((filterRoute) => (
        <li key={`overlay-link-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview fontSize={fontSize} inListView={true} fontFamily={`${filterRoute.filterIdentifier}-0`}>{filterRoute.title}</FontPreview>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListViewOverlay;
