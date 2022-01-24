import React from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";

export const ulRule = () => ({
  // overflowX: "hidden"
})

export const fontPreviewContainerRule = ({ fontSize }) => ({
  position: "relative",
  height: `${fontSize * 1}px`,
});

function ListView(props) {
  const { filterRoutes, fontSize } = props;
  const { css } = useFela({ fontSize });
  return (
    <ul className={css(ulRule)}> 
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
