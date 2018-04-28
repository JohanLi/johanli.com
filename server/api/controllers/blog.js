import blog from '../models/blog';
import prismjsHighlight from '../helpers/prismjsHighlight';
import imageContainer from '../helpers/imageContainer';

const entriesPerPage = 3;

const setPublished = entries => entries.map((entry) => {
  const date = new Date(entry.published * 1000);

  return {
    ...entry,
    published: {
      timestamp: entry.published,
      month: date.toLocaleString('en-us', { month: 'short' }),
      date: date.getDate(),
      year: date.getFullYear(),
    },
  };
});

const setArchive = (entries) => {
  const archive = [];
  const seenYears = [];

  entries.forEach((entry) => {
    if (!seenYears.includes(entry.published.year)) {
      seenYears.push(entry.published.year);

      archive[seenYears.length - 1] = {
        year: entry.published.year,
        entries: [],
      };
    }

    archive[seenYears.length - 1].entries.push(entry);
  });

  return archive;
};

const getArchive = async () => {
  let entries = await blog.archive();
  entries = setPublished(entries);

  return setArchive(entries);
};

const getTotalPages = async () => {
  const result = await blog.entriesCount();

  return Math.ceil(result[0].numberOfEntries / entriesPerPage);
};

export default {
  async getPage(req, res) {
    const page = req.params.page || 1;
    const offset = (parseInt(page, 10) - 1) * entriesPerPage;

    let entries = await blog.page(entriesPerPage, offset);

    if (!entries.length) {
      throw new Error('Page not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    res.json({
      entries,
      archive: await getArchive(),
      totalPages: await getTotalPages(),
    });
  },

  async getByUrlKey(req, res) {
    let entries = await blog.urlKey(req.params.urlKey);

    if (!entries.length) {
      throw new Error('URL not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    res.json({
      entries,
      archive: await getArchive(),
      totalPages: await getTotalPages(),
    });
  },
};
