const { simpleQueryWithResult } = require("./common");

export function getOrganizationMenu(sendBack, data, requestParams) {
  const sql = `SELECT * from organizationMenu WHERE organizationMenu.id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
}

export function getOrganizationInfo(sendBack, data, requestParams) {
  const sql = `SELECT name, address, url, phones, categories, rating, logo, menuFeatures, elseFeatures, organizationImages, userReviews, reviewsCategories,
    organizationHours.id, organizationHours.text, organizationHours.Everyday, organizationHours.Monday, organizationHours.Tuesday, organizationHours.Wednesday, organizationHours.Thursday, organizationHours.Friday, organizationHours.Saturday, organizationHours.Sunday from organizations
    JOIN organizationHours ON organizations.id=${requestParams.id} AND organizationHours.id=${requestParams.id}`;
  simpleQueryWithResult(sql, sendBack);
}

export function getCoords(sendBack) {
  const sql = `SELECT coordinatesX, coordinatesY, id, name from organizations`;
  simpleQueryWithResult(sql, sendBack);
}

export async function getAllRows(sendBack) {
  console.log("getAllOrganizations");
  const sql = `SELECT * from organizations`;
  simpleQueryWithResult(sql, sendBack);
}

export async function getAllMenu(sendBack) {
  console.log("getAllMenu");
  const sql = `SELECT * from organizationMenu`;
  simpleQueryWithResult(sql, sendBack);
}

export async function getAllHours(sendBack) {
  console.log("getAllHours");
  const sql = `SELECT * from organizationHours`;
  simpleQueryWithResult(sql, sendBack);
}
