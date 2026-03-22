const getHealth = (req, res) => {
  res.status(200).send('API running');
};

module.exports = {
  getHealth,
};
