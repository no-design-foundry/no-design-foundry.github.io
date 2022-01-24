export function getMaxFontSize(text, fontFamily) {
  const span = document.createElement("span");
  span.innerHTML = text;
  span.style.fontSize = "200px"
  span.style.fontFamily = fontFamily
  document.body.appendChild(span);
  const { offsetWidth } = span;
  document.body.removeChild(span);
  return Math.floor(200 * ((document.body.clientWidth-20)/offsetWidth));
}

export function dictToFontVariationSettings(dict) {
  const value = Object.keys(dict).reduce((collector, key) => {
    collector.push(`"${key}" ${dict[key]}`)
    return collector
  }, []).join(", ")
  return value ? value : null
}


