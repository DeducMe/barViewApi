const { simpleQueryWithResult } = require("./common");

exports.getOrganizationMenu = (sendBack, data, requestParams) => {
  const sql = `SELECT * from organizationMenu WHERE organizationMenu.id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getOrganizationInfo = (sendBack, data, requestParams) => {
  const sql = `SELECT name, address, url, phones, categories, rating, logo, menuFeatures, elseFeatures, organizationImages, userReviews, reviewsCategories,
    organizationHours.id, organizationHours.text, organizationHours.Everyday, organizationHours.Monday, organizationHours.Tuesday, organizationHours.Wednesday, organizationHours.Thursday, organizationHours.Friday, organizationHours.Saturday, organizationHours.Sunday from organizations
    JOIN organizationHours ON organizations.id=${requestParams.id} AND organizationHours.id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getCoords = (sendBack) => {
  const sql = `SELECT coordinatesX, coordinatesY, id, name, rating from organizations`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getAllRows = async (sendBack) => {
  console.log("getAllOrganizations");
  const sql = `SELECT * from organizations`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getAllMenu = async (sendBack) => {
  console.log("getAllMenu");
  const sql = `SELECT * from organizationMenu`;
  simpleQueryWithResult(sql, sendBack);
};

exports.getAllHours = async (sendBack) => {
  console.log("getAllHours");
  const sql = `SELECT * from organizationHours`;
  simpleQueryWithResult(sql, sendBack);
};
