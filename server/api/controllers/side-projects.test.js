import sideProjects from './side-projects';
import model from '../models/side-projects';

model.projects = jest.fn();
model.blogEntries = jest.fn();

const res = {
  json: jest.fn(),
};

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
  it('joins in blog entries', async () => {
    model.projects.mockResolvedValue(projects);
    model.blogEntries.mockResolvedValue(blogEntries);
    await sideProjects.get({}, res);

    expect(res.json).toHaveBeenCalledWith([
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

  it('handles zero side projects', async () => {
    model.projects.mockResolvedValue([]);
    model.blogEntries.mockResolvedValue(blogEntries);
    await sideProjects.get({}, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('handles zero blog entries', async () => {
    model.projects.mockResolvedValue(projects);
    model.blogEntries.mockResolvedValue([]);
    await sideProjects.get({}, res);

    expect(res.json).toHaveBeenCalledWith([
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
