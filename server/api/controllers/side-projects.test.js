import sideProjects from './side-projects';
import model from '../models/side-projects';

const res = {
  json: jest.fn(),
};

model.projects = jest.fn();
model.blogEntries = jest.fn();

describe('side projects', () => {
  it('joins in blog entries', async () => {
    expect.assertions(1);

    model.projects.mockResolvedValue([
      [
        {
          id: 1,
          name: 'First Project',
        },
        {
          id: 2,
          name: 'Second Project',
        },
      ],
    ]);

    model.blogEntries.mockResolvedValue([
      [
        {
          side_project_id: 2,
          url: 'second-project-blog',
          title: 'Second Project Blog',
        },
        {
          side_project_id: 2,
          url: 'second-project-blog-2',
          title: 'Second Project Blog 2',
        },
      ],
    ]);

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
    ]);
  });

  it('handles zero side projects', async () => {
    expect.assertions(1);

    model.projects.mockResolvedValue([
      [],
    ]);

    model.blogEntries.mockResolvedValue([
      [
        {
          side_project_id: 1,
          url: 'orphaned-project-blog',
          title: 'Orphaned Project Blog',
        },
      ],
    ]);

    await sideProjects.get({}, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('handles zero blog entries', async () => {
    expect.assertions(1);

    model.projects.mockResolvedValue(
      [[
        {
          id: 1,
          name: 'First Project',
        },
      ]],
    );

    model.blogEntries.mockResolvedValue([
      [],
    ]);

    await sideProjects.get({}, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'First Project',
        blogEntries: [],
      },
    ]);
  });
});
