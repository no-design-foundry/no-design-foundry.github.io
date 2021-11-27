import React from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";

const containerRule = ({navHeight}) => ({
    marginTop: `${navHeight}px`
})

const fontPreviewContainerRule = () => ({
  position: "relative",
  height: "300px",
})

function ListViewOverlay(props) {
  const { filterRoutes, navHeight } = props;
  const { css } = useFela({navHeight})
  return (
    <ul className={css(containerRule)}>
      {filterRoutes.map((filterRoute) => (
        <li key={`overlay-link-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview fontSize={200} inListView={true}>{filterRoute.title}</FontPreview>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListViewOverlay;
