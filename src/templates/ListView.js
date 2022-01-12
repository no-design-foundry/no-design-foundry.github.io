import React, { useState, useRef } from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";

export const fontPreviewContainerRule = ({ fontSize }) => ({
  position: "relative",
  height: `${fontSize * 0.8}px`,
});

function ListView(props) {
  const { filterRoutes, fontSize } = props;
  const { css } = useFela({ fontSize });
  return (
    <ul>
      {filterRoutes.map((filterRoute) => (
        <li key={`list-view-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview
                fontSize={fontSize}
                inListView={true}
              >
                {filterRoute.title}
              </FontPreview>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListView;
