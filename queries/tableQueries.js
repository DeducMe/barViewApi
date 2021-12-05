const { dropTable } = require("./common");

export async function dropMenuTable() {
  const sql = `DROP TABLE organizationMenu`;
  dropTable(
    sql,
    `Table organizationMenu not destroyed`,
    `Table organizationMenu destroyed`
  );
}

export async function dropHoursTable() {
  const sql = `DROP TABLE organizationHours`;
  dropTable(
    sql,
    `Table organizationHours not destroyed`,
    `Table organizationHours destroyed`
  );
}

export async function dropMainTable() {
  const sql = `DROP TABLE organizations`;
  dropTable(
    sql,
    `Table organizations not destroyed`,
    `Table organizations destroyed`
  );
}

export async function createOrganizationsTable() {
  const sqlMain = `CREATE TABLE organizations (name VARCHAR(255), address VARCHAR(255), coordinatesX FLOAT, coordinatesY FLOAT, id BIGINT, url VARCHAR(255), phones VARCHAR(255), categories VARCHAR(255),rating FLOAT, logo VARCHAR(255), menuFeatures TEXT, elseFeatures TEXT, organizationImages TEXT, userReviews TEXT, reviewsCategories TEXT)`;

  createTable(
    sqlMain,
    `table organizations already exist`,
    `Table organizations created`
  );
}

export async function createHoursTable() {
  const sqlOrganizationHours = `CREATE TABLE organizationHours (id BIGINT, text VARCHAR(255), Everyday VARCHAR(255), Monday VARCHAR(255), Tuesday VARCHAR(255), Wednesday VARCHAR(255), Thursday VARCHAR(255), Friday VARCHAR(255), Saturday VARCHAR(255), Sunday VARCHAR(255))`;

  createTable(
    sqlOrganizationHours,
    `table organizationHours already exist`,
    `Table organizationHours created`
  );
}

export async function createMenuTable() {
  const sqlOrganizationMenu = `CREATE TABLE organizationMenu (id BIGINT, category VARCHAR(255), dishes TEXT)`;

  createTable(
    sqlOrganizationMenu,
    `table organizationMenu already exist`,
    `Table organizationMenu created`
  );
}
