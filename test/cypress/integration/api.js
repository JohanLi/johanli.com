describe('Api', () => {
  it('responds to GET /api/blog/latest', () => {
    cy
      .request('/api/blog/latest')
      .its('body')
      .should('have.length', 3)
      .each((latestBlogEntry) => {
        expect(latestBlogEntry).to.contain.all.keys(
          ['url', 'title', 'excerpt'],
        );
      });
  });

  it('responds to GET /api/blog/1', () => {
    cy
      .request('/api/blog/1')
      .its('body')
      .should('have.all.keys', ['entries', 'totalPages'])
      .its('entries')
      .should('have.length', 3);
  });

  it('responds to GET /api/blog/everything-is-more-complex-than-we-think-it-is', () => {
    cy
      .request('/api/blog/everything-is-more-complex-than-we-think-it-is')
      .its('body')
      .should('have.all.keys', ['url', 'title', 'excerpt', 'html', 'published']);
  });

  it('responds to GET /api/blog/archive', () => {
    cy
      .request('/api/blog/archive')
      .its('body')
      .each((year) => {
        expect(year).to.contain.all.keys(
          ['entries', 'year'],
        );
      });
  });

  it('responds to GET /api/side-projects', () => {
    cy
      .request('/api/side-projects')
      .its('body')
      .each((sideProject) => {
        expect(sideProject).to.contain.all.keys(
          ['id', 'name', 'description', 'homepage_url', 'github_url', 'image_url', 'state', 'blogEntries'],
        );
      });
  });

  it('responds to GET /api/pokemon-go/map-objects', () => {
    cy
      .request('/api/pokemon-go/map-objects')
      .its('body')
      .should('have.all.keys', ['gyms', 'pokestops']);
  });
});
