import blog from './blog';

blog.page = jest.fn();
blog.urlKey = jest.fn();
blog.archive = jest.fn();
blog.entriesCount = jest.fn();
blog.latest = jest.fn();

describe('blog', () => {
  it('returns entries by page', () => {
    blog.page.mockResolvedValue([
      {
        url: 'first',
        title: 'first title',
        published: 1525208540,
      },
      {
        url: 'second',
        title: 'second title',
        published: 1525208551,
      },
    ]);

    blog.entriesCount.mockResolvedValue([
      {
        numberOfEntries: 13,
      },
    ]);

    expect.assertions(1);
    return expect(blog.getPage('1')).resolves.toEqual({
      entries: [
        {
          url: 'first',
          title: 'first title',
          published: {
            timestamp: 1525208540,
            month: 'May',
            date: 1,
            year: 2018,
          },
        },
        {
          url: 'second',
          title: 'second title',
          published: {
            timestamp: 1525208551,
            month: 'May',
            date: 1,
            year: 2018,
          },
        },
      ],
      totalPages: 5,
    });
  });

  it('throws if getting non-positive page', () => {
    blog.page.mockResolvedValue([]);

    expect.assertions(1);
    return expect(blog.getPage('0')).rejects.toBeInstanceOf(Error);
  });

  it('throws if no entries were found by page', () => {
    blog.page.mockResolvedValue([]);

    expect.assertions(1);
    return expect(blog.getPage('9999')).rejects.toBeInstanceOf(Error);
  });

  it('returns entry by urlKey', () => {
    blog.urlKey.mockResolvedValue([
      {
        url: 'urlKey',
        title: 'urlKey title',
        published: 1525208540,
      },
    ]);

    expect.assertions(1);
    return expect(blog.getByUrlKey('urlKey')).resolves.toEqual({
      url: 'urlKey',
      title: 'urlKey title',
      published: {
        timestamp: 1525208540,
        month: 'May',
        date: 1,
        year: 2018,
      },
    });
  });

  it('throws if no entry by urlKey is found', () => {
    blog.urlKey.mockResolvedValue([]);

    expect.assertions(1);
    return expect(blog.getByUrlKey('not-found')).rejects.toBeInstanceOf(Error);
  });

  it('returns archive', () => {
    blog.archive.mockResolvedValue([
      {
        url: 'first-2009',
        title: 'title',
        published: 1234567890,
      },
      {
        url: 'second-2009',
        title: 'title',
        published: 1244567890,
      },
      {
        url: 'first-2011',
        title: 'title',
        published: 1293840000,
      },
      {
        url: 'first-2012',
        title: 'title',
        published: 1356998399,
      },
    ]);

    expect.assertions(1);
    return expect(blog.getArchive()).resolves.toEqual([
      {
        year: 2009,
        entries: [
          {
            url: 'first-2009',
            title: 'title',
            published: {
              timestamp: 1234567890,
              month: 'Feb',
              date: 13,
              year: 2009,
            },
          },
          {
            url: 'second-2009',
            title: 'title',
            published: {
              timestamp: 1244567890,
              month: 'Jun',
              date: 9,
              year: 2009,
            },
          },
        ],
      },
      {
        year: 2011,
        entries: [
          {
            url: 'first-2011',
            title: 'title',
            published: {
              timestamp: 1293840000,
              month: 'Jan',
              date: 1,
              year: 2011,
            },
          },
        ],
      },
      {
        year: 2012,
        entries: [
          {
            url: 'first-2012',
            title: 'title',
            published: {
              timestamp: 1356998399,
              month: 'Dec',
              date: 31,
              year: 2012,
            },
          },
        ],
      },
    ]);
  });

  it('returns latest', () => {
    const latest = [
      {
        url: 'first',
        title: 'first title',
        excerpt: 'first excerpt',
      },
      {
        url: 'second',
        title: 'second title',
        excerpt: 'second excerpt',
      },
    ];

    blog.latest.mockResolvedValue(latest);

    expect.assertions(1);
    return expect(blog.getLatest()).resolves.toEqual(latest);
  });
});
