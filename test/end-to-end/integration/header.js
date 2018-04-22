const navigate = (expectation, contains, pathname) => {
  it(expectation, () => {
    cy
      .get('header')
      .get('button')
      .click();

    cy
      .contains(contains)
      .click()
      .location('pathname')
      .should('eq', pathname);
  });
};

describe('Header', () => {
  context('mobile', () => {
    beforeEach(() => {
      cy.viewport(360, 640)
    });

    before(() => {
      cy
        .visit('/')
    });

    navigate('can navigate to Blog', 'Blog', '/blog');
    navigate('can navigate to Side Projects', 'Side Projects', '/side-projects');
    navigate('can navigate back to Home', 'Home', '/');
  })
});
