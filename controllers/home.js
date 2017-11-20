/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('case', {
    title: 'Customize your phone cases'
  });
};
