const path = require("path")
const data = require("./data.json")

exports.createPages = function ({ actions, graphql }) {
  const template = path.resolve("./src/templates/Page.js")
  data.forEach(entry => {
    actions.createPage({
      path: entry.route,
      component: template,
      context: { ...entry, websiteContext:data},
    })
  })
}
