import React from "react";
import PageHeader from "./page-header";

describe("<PageHeader />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <PageHeader
        title="Page Header Title"
        description="Page description body text"
      />
    );
    cy.get(".text-lg").should("have.text", "Page Header Title");
  });
});
