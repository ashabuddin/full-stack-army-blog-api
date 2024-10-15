const articleService = require("../../../../lib/article");
const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");

const findAllItem = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    //data
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    //response generation
    const data = query.getTransformedItems({
      items: articles,
      selection: ['id', 'title', 'cover', 'author', 'updatedAt', 'createdAt'],
      path: "/articles",
    });
    //pagination
    const totalItems = await articleService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    //HeatsOS links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};
module.exports = findAllItem;
