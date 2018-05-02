import sideProjects from './side-projects';

sideProjects.projects = jest.fn();
sideProjects.blogEntries = jest.fn();

const projects = [
  {
    id: 1,
    name: 'First Project',
  },
  {
    id: 2,
    name: 'Second Project',
  },
  {
    id: 3,
    name: 'Third Project',
  },
];

const blogEntries = [
  {
    side_project_id: 2,
    url: 'second-project-blog',
    title: 'Second Project Blog',
  },
  {
    side_project_id: 3,
    url: 'third-project-blog',
    title: 'Third Project Blog',
  },
  {
    side_project_id: 2,
    url: 'second-project-blog-2',
    title: 'Second Project Blog 2',
  },
];

describe('side projects', () => {
  it('joins in blog entries', () => {
    sideProjects.projects.mockResolvedValue(projects);
    sideProjects.blogEntries.mockResolvedValue(blogEntries);

    expect.assertions(1);
    return expect(sideProjects.get()).resolves.toEqual([
      {
        id: 1,
        name: 'First Project',
        blogEntries: [],
      },
      {
        id: 2,
        name: 'Second Project',
        blogEntries: [
          {
            url: 'second-project-blog',
            title: 'Second Project Blog',
          },
          {
            url: 'second-project-blog-2',
            title: 'Second Project Blog 2',
          },
        ],
      },
      {
        id: 3,
        name: 'Third Project',
        blogEntries: [
          {
            url: 'third-project-blog',
            title: 'Third Project Blog',
          },
        ],
      },
    ]);
  });

  it('handles zero side projects', () => {
    sideProjects.projects.mockResolvedValue([]);
    sideProjects.blogEntries.mockResolvedValue(blogEntries);

    expect.assertions(1);
    return expect(sideProjects.get()).resolves.toEqual([]);
  });

  it('handles zero blog entries', () => {
    sideProjects.projects.mockResolvedValue(projects);
    sideProjects.blogEntries.mockResolvedValue([]);

    expect.assertions(1);
    return expect(sideProjects.get()).resolves.toEqual([
      {
        id: 1,
        name: 'First Project',
        blogEntries: [],
      },
      {
        id: 2,
        name: 'Second Project',
        blogEntries: [],
      },
      {
        id: 3,
        name: 'Third Project',
        blogEntries: [],
      },
    ]);
  });
});
