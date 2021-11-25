import { createContext, useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import Link from "./components/Link";
import Nav from "./components/Nav";
import data from "./data";
import DetailView from "./templates/DetailView";

export const FormInputsContext = createContext();
export const InputFontContext = createContext();
export const PreviewStringsContext = createContext();
export const FontSizeContext = createContext();

const filterRoutes = data.filter((route) => route.type === "filterDetailView");
const _formInputValues = filterRoutes.reduce((collector, filterRoute) => {
  collector[filterRoute.fontIdentifier] = filterRoute.inputs.reduce(
    (inputCollector, input) => {
      inputCollector[input.name] = input.default;
      return inputCollector;
    },
    {}
  );
  return collector;
}, {});

function App() {
  const [inputFont, setInputFont] = useState(null);
  const [fontSize, setFontSize] = useState(200);
  const [formInputValues, _setFormInputsValue] = useState(_formInputValues);
  function setFormInputValue(fontIdentifier, name, value) {
    let collector = { ...formInputValues };
    collector[fontIdentifier][name] = value;
    _setFormInputsValue(collector);
  }

  const [previewStrings, _setPreviewString] = useState(filterRoutes.reduce((collector, filterRoute) => {
    collector[filterRoute.fontIdentifier] = filterRoute.title
    return collector
  }
  , {}))
  

  function setPreviewString(fontIdentifier, value) {
    let collector = {...previewStrings}
    collector[fontIdentifier] = value
    _setPreviewString(collector)
  }

  return (
    <div className="App">
      <Nav>
        {filterRoutes.map((route, index) => (
          <Link key={`nav_${index}`} to={route.route}>
            {route.title}
          </Link>
        ))}
      </Nav>
      <FormInputsContext.Provider
        value={{ formInputValues, setFormInputValue }}
      >
        <InputFontContext.Provider value={{ inputFont, setInputFont }}>
          <PreviewStringsContext.Provider value={{previewStrings, setPreviewString}}>
            <FontSizeContext.Provider value={{fontSize, setFontSize}}>
            <Routes>
              {filterRoutes.map((route, index) => (
                <Route
                  path={route.route}
                  element={<DetailView {...route}></DetailView>}
                  key={`route_${index}`}
                ></Route>
              ))}
            </Routes>
            </FontSizeContext.Provider>
          </PreviewStringsContext.Provider>
        </InputFontContext.Provider>
      </FormInputsContext.Provider>
    </div>
  );
}

export default App;
