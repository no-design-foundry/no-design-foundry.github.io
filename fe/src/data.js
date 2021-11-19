export default [
  {
    type: "filterListView",
    route: "/",
  },
  {
    type: "filterDetailView",
    title: "Rotorizer",
    fontIdentifier: "rotorizer",
    route: "/rotorizer",
    numberOfLayers: 2,
    layerColors: ["gray", "#000"],
    variableFontControlSliders: [{
      "title": "rotation",
      "tag": "RTTX",
      "min": 0,
      "max": 360,
      "default": 0,
    }],
    inputs: [
      {
        type: "slider",
        title: "depth",
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
    fontIdentifier: "rasterizer",
    route: "/rasterizer",
    numberOfLayers: 1,
    layerColors: ["#000"],
    inputs: [
      {
        type: "slider",
        title: "resolution",
        name: "resolution",
        min: 10,
        max: 150,
        default: 20,
      },
    ],
  },
];
