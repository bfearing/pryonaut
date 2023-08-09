describe("Navigation", () => {
  it("should navigate to the login page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find email input and type email into field
    cy.get("#email").type("brandon.fearing@gmail.com");

    // Find login button and click it
    cy.get(".inline-flex").click();

    // The new url should include "/profile"
    cy.url().should("include", "/profile");

    // The new page should contain an h3 with "Welcome brfearing!"
    cy.get("h3").contains("Welcome");
  });
});
