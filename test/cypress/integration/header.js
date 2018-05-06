import viewports from '../viewports';

describe('Header', () => {
  viewports.forEach(({ name, viewport }) => {
    context(name, () => {
      beforeEach(() => {
        cy.viewport(...viewport);
      });

      if (name === 'mobile') {
        it('allows navigation', () => {
          cy
            .visit('/')
            .get('header')
            .find('button')
            .click()
            .get('header')
            .contains('Blog')
            .click()
            .location('pathname')
            .should('eq', '/blog')
            .get('header')
            .find('button')
            .click()
            .get('header')
            .contains('Home')
            .click()
            .location('pathname')
            .should('eq', '/');
        });
      }

      if (name === 'desktop') {
        it('allows navigation', () => {
          cy
            .visit('/')
            .get('header')
            .contains('Side Projects')
            .click()
            .location('pathname')
            .should('eq', '/side-projects')
            .get('header')
            .contains('Johan Li')
            .click()
            .location('pathname')
            .should('eq', '/');
        });
      }
    });
  });
});
