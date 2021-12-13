import React, { useState, useRef } from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";

export const fontPreviewContainerRule = ({ fontSize }) => ({
  position: "relative",
  height: `${fontSize * 1.1}px`,
});

function ListView(props) {
  const { filterRoutes, fontSize, setFontSize } = props;
  const { css } = useFela({ fontSize });
  const fontSizeRef = useRef(200);

  function handleOnFontPreviewMount(contentWidth) {
    const bodyWidth = document.body.clientWidth - 20;
    if (contentWidth > bodyWidth) {
      const scale = fontSize * (bodyWidth / contentWidth);
      if (scale < fontSizeRef.current) {
        setFontSize(scale);
        fontSizeRef.current = scale;
      }
    }
  }

  return (
    <ul>
      {filterRoutes.map((filterRoute, index) => (
        <li key={`list-view-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview
                fontSize={fontSize}
                inListView={true}
                onMount={handleOnFontPreviewMount}
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
