import React from "react";
import FontPreview from "../components/FontPreview";
// import { Link } from "react-router-dom"
import Link from "../components/Link";
import { defaultFontSize } from "../rules/variables";

function FilterListView(props) {
  const { filterRoutes } = props;
  return (
      filterRoutes.map((filter, index) => (
        <Link to={filter.route} key={`ListViewEntryLink_${index}`}>
          <FontPreview
            fontSize={defaultFontSize}
            isEven={index % 2 === 0}
            inDetailView={false}
            stuckOnTop={index === 0}
            stuckOnBottom={index === filterRoutes.length - 1}
            numberOfLayers={filter.numberOfLayers}
            layerColors={filter.layerColors}
          >
            {filter.title}
          </FontPreview>
        </Link>
      ))
  );
}

export default React.memo(FilterListView);
