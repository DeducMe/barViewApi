const format = require("pg-format");
const {
  simpleQueryWithResult,
  simpleQuery,
  dataQueryWithResult,
  callbackQuery,
} = require("./common");

exports.postMenu = async (sendBack, data) => {
  async function putMenu(sendBack, data, id) {
    const sql = `DELETE FROM organizationMenu WHERE id = ${id}`;
    simpleQuery(sql);
    insertMenu(sendBack, data);
  }

  function insertMenu(sendBack, data) {
    const sql = format(
      `INSERT INTO organizationMenu (id, category, dishes) VALUES %L`,
      data
    );

    simpleQueryWithResult(sql, sendBack);
  }

  const sql = `SELECT id from organizationMenu WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(`put menu`, data.id);
      putMenu(sendBack, data.menuPositions, data.id);
    } else {
      console.log(`insert menu`, data.id);
      insertMenu(sendBack, data.menuPositions);
    }
  });
};

exports.postHours = async (sendBack, data) => {
  function putHours(sendBack, data) {
    const sqlQueryData = Object.values(data);
    const sql = `UPDATE organizationHours SET id = $1, text = $2, Everyday = $3, Monday = $4, Tuesday = $5, Wednesday = $6, Thursday = $7, Friday = $8, Saturday = $9, Sunday = $10 WHERE organizationHours.id=${data.id}`;
    dataQueryWithResult(sql, sqlQueryData, sendBack);
  }

  function insertHours(sendBack, data) {
    const sqlQueryData = Object.values(data);
    const sql = `INSERT INTO organizationHours (id, text, Everyday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    dataQueryWithResult(sql, sqlQueryData, sendBack);
  }

  const sql = `SELECT id from organizationHours WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(`put hours`, data.id);
      putHours(sendBack, data);
    } else {
      console.log(`insert hours`, data.id);
      insertHours(sendBack, data);
    }
  });
};

exports.postOrganization = async (sendBack, data) => {
  function putOrganization(sendBack, data) {
    const sqlQueryData = Object.values(data).map((item) => {
      if (Array.isArray(item)) {
        return item.join(`|`);
      }
      return item;
    });
    const sql = `UPDATE organizations SET coordinatesX = $1, coordinatesY = $2, name = $3, address = $4, id = $5, url = $6, phones = $7, categories = $8, rating = $9, logo = $10, menuFeatures = $11, elseFeatures = $12, organizationImages = $13, userReviews = $14, reviewsCategories = $15 WHERE organizations.id=${data.id}`;
    dataQueryWithResult(sql, sqlQueryData, sendBack);
  }

  function insertOrganization(sendBack, data) {
    const sqlQueryData = Object.values(data).map((item) => {
      if (Array.isArray(item)) {
        return item.join(`|`);
      }
      return item;
    });
    const sql = `INSERT INTO organizations (coordinatesX, coordinatesY, name, address, id, url, phones, categories, rating, logo, menuFeatures, elseFeatures, organizationImages, userReviews, reviewsCategories) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
    dataQueryWithResult(sql, sqlQueryData, sendBack);
  }

  const sql = `SELECT id from organizations WHERE id=${data.id}`;
  callbackQuery(sql, function (err, result) {
    if (result?.rows.length > 0) {
      console.log(`put org`, data.id);
      putOrganization(sendBack, data);
    } else {
      console.log(`insert org`, data.id);
      insertOrganization(sendBack, data);
    }
  });
};
