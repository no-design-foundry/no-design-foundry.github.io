import React from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Layer from "../components/Layer";
import Link from "../components/Link";
import { fontPreviewContainerRule } from "./ListView";

const containerRule = ({ navHeight }) => ({
  marginTop: `${navHeight}px`,
});

function ListViewOverlay(props) {
  const { filterRoutes, navHeight, fontSize } = props;
  const { css } = useFela({ navHeight, fontSize });
  return (
    <ul className={css(containerRule)}>
      {filterRoutes.map((filterRoute) => (
        <li key={`overlay-link-${filterRoute.route}`}>
          <Link to={filterRoute.route}>
            <div className={css(fontPreviewContainerRule)}>
              <FontPreview
                key={`overlay-font-preview-${filterRoute.route}`}
                fontSize={fontSize}
                inListView={true}
                fontVariations={(
                  filterRoute?.variableFontControlSliders ?? []
                ).reduce((collector, route) => {
                  collector[route.tag] = route.default;
                  return collector;
                }, {})}
              >
                {filterRoute.layerColors.map((color, index) => (
                  <Layer
                    color={color}
                    key={`listViewOverlay-${color}-${index}`}
                    fontFamily={`${filterRoute.filterIdentifier}-${index}`}
                    color={color}
                  >
                    {filterRoute.title}
                  </Layer>
                ))}
              </FontPreview>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(ListViewOverlay);
