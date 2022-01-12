export default [
  {
    type: "filterListView",
    route: "/",
  },
  {
    type: "filterDetailView",
    title: "Rotorizer",
    filterIdentifier: "rotorizer",
    route: "/rotorizer",
    numberOfLayers: 2,
    layerColors: ["gray", "#000"],
    variableFontControlSliders: [
      {
        label: "rotation",
        tag: "RTTX",
        min: 0,
        max: 360,
        default: 130,
      },
    ],
    inputs: [
      {
        type: "range",
        label: "depth",
        name: "depth",
        min: 2,
        max: 600,
        default: 20,
      },
    ],
  },
  {
    type: "filterDetailView",
    title: "Rastr",
    filterIdentifier: "rasterizer",
    route: "/rasterizer",
    numberOfLayers: 1,
    layerColors: ["#000"],
    inputs: [
      {
        type: "range",
        label: "resolution",
        name: "resolution",
        min: 10,
        max: 150,
        default: 20,
      },
    ],
  },
];
