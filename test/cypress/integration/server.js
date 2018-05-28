import viewports from '../viewports';

describe('Server', () => {
  viewports.forEach(({ name, viewport }) => {
    context(name, () => {
      beforeEach(() => {
        cy.viewport(...viewport);
      });

      it('inlines CSS on first load', () => {
        cy
          .visit('/')
          .get('head')
          .find('style')
          .should('have.length', 1)
          .get('head')
          .find('link[rel="stylesheet"]')
          .should('have.attr', 'media', 'none');
      });

      it('does not inline CSS on subsequent loads', () => {
        cy
          .setCookie('css-loaded', 'loadedDuringTest')
          .visit('/')
          .get('head')
          .find('style')
          .should('have.length', 0)
          .get('head')
          .find('link[rel="stylesheet"]')
          .should('not.have.attr', 'media');
      });
    });
  });
});
