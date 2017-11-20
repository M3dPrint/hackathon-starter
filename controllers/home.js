/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('upload', {
    title: 'Customize your phone cases'
  });
};


exports.upload = (req, res) => {
    res.render('upload', {
        title: 'Customize your phone cases'
    });
};