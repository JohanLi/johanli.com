describe('Api', () => {
  it('responds to GET /api/blog/1', () => {
    cy
      .request('/api/blog/1')
      .its('body')
      .should('have.all.keys', ['entries', 'archive', 'totalPages'])
      .its('entries')
      .should('have.length', 3);
  });

  it('responds to GET /api/blog/everything-is-more-complex-than-we-think-it-is', () => {
    cy
      .request('/api/blog/everything-is-more-complex-than-we-think-it-is')
      .its('body')
      .should('have.all.keys', ['entries', 'archive', 'totalPages'])
      .its('entries')
      .should('have.length', 1);
  });

  it('responds to GET /api/side-projects', () => {
    cy
      .request('/api/side-projects')
      .its('body')
      .each((sideProject) => {
        expect(sideProject).to.contain.all.keys(
          ['id', 'name', 'description', 'homepage_url', 'github_url', 'image_url', 'state'], // blogEntries should not be an optional property
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
