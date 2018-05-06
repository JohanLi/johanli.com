import viewports from '../viewports';

describe('Blog', () => {
  const pagination = '[class*="pagination__pagination"]';
  const published = '[class*="entry__published"]';
  const archive = '[class*="archive__archive"]';
  const imageZoom = '.imageContainer';
  const imageZoomed = '[class*="imageZoomed__imageZoomed"]';

  viewports.forEach(({ name, viewport }) => {
    context(name, () => {
      beforeEach(() => {
        cy.viewport(...viewport);
      });

      it('displays 3 entries per page', () => {
        cy
          .visit('/blog')
          .get('article')
          .should('have.length', 3);
      });

      it('displays publish dates', () => {
        cy
          .get('article')
          .each(($article) => {
            const date = $article.find(published).text();
            expect(date).to.match(/^[A-Za-z]{3}[0-9]{5,6}$/);
          });
      });

      it('has pagination', () => {
        cy
          .get(pagination)
          .contains('Next')
          .click()
          .location('pathname')
          .should('eq', '/blog/2')
          .get(pagination)
          .contains('Previous')
          .click()
          .location('pathname')
          .should('eq', '/blog')
          .get(pagination)
          .contains('3')
          .click()
          .location('pathname')
          .should('eq', '/blog/3')
          .get(pagination)
          .contains('1')
          .click()
          .location('pathname')
          .should('eq', '/blog');
      });

      it('displays an archive of entries', () => {
        cy
          .get(archive)
          .contains('Everything Is More Complex Than We Think It Is')
          .click()
          .location('pathname')
          .should('eq', '/blog/everything-is-more-complex-than-we-think-it-is')
          .go('back')
          .get(archive)
          .contains('Mapping Pokestop Clusters in Stockholm')
          .click()
          .location('pathname')
          .should('eq', '/blog/mapping-pokestop-clusters-in-stockholm');
      });

      it('displays single blog entries', () => {
        cy
          .visit('/blog/venturing-into-html5-game-development')
          .get('article')
          .should('have.length', 1)
          .get(pagination)
          .contains('View More Entries')
          .click()
          .location('pathname')
          .should('eq', '/blog');
      });

      it('renders code snippets using Prism', () => {
        cy
          .visit('/blog/recounting-a-year-of-overhauling-an-e-commerce-solution')
          .get('pre.language-php')
          .should('have.length', 1)
          .get('code.language-php')
          .should('have.length', 1);
      });

      if (name === 'mobile') {
        it('does not allow zooming specific images', () => {
          cy
            .visit('/blog/the-cruel-yet-inspirational-sport-of-boxing')
            .get(imageZoom)
            .first()
            .click()
            .get(imageZoomed)
            .should('have.length', 0);
        });
      }

      if (name === 'desktop') {
        it('allows zooming specific images', () => {
          cy
            .visit('/blog/the-cruel-yet-inspirational-sport-of-boxing')
            .get(imageZoom)
            .first()
            .click()
            .get(imageZoomed)
            .should('have.length', 1)
            .get('body')
            .type('{esc}')
            .get(imageZoomed)
            .should('have.length', 0)
            .get(imageZoom)
            .last()
            .click()
            .get(imageZoomed)
            .should('have.length', 1)
            .click()
            .get(imageZoomed)
            .should('have.length', 0)
            .get(imageZoom)
            .last()
            .click()
            .get(imageZoomed)
            .should('have.length', 1)
            .window()
            .scrollTo(0, 10)
            .get(imageZoomed)
            .should('have.length', 0);
        });
      }
    });
  });
});
