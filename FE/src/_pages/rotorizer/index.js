import React from "react"
import FilterDetailView from "../../templates/FilterDetailView"
import Page from "../../templates/Page"
import data from "./data.json"

export default function Route() {
  return (
    <Page>
      <FilterDetailView {...data} />
    </Page>
  )
}
