import React, { useState, useRef } from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Link from "../components/Link";


const fontPreviewContainerRule = () => ({
  position: "relative",
  height: "300px",
})

function ListView(props) {
  const { filterRoutes, fontSize, setFontSize } = props;
  const {css} = useFela()
  // const [fontSize, setFontSize] = useState(200)
  const fontSizeRef = useRef(200)

  function handleOnFontPreviewMount(contentWidth, currentFontSize) {
    const bodyWidth = document.body.clientWidth - 20
    // console.log({bodyWidth})
    // console.log(contentWidth)
    if (contentWidth > bodyWidth) {
      const scale = fontSize*(bodyWidth/contentWidth)
      if (scale < fontSizeRef.current) {
        setFontSize(scale)
        fontSizeRef.current = scale
      }
    }
  }

  return (
    <ul>
      {filterRoutes.map((filterRoute) => (
        <li key={`list-view-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview fontSize={fontSize} inListView={true} onMount={handleOnFontPreviewMount}>{filterRoute.title}</FontPreview>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListView;
