const { Pool } = require("pg");
require("dotenv").config();
const express = require(`express`);
const bodyParser = require(`body-parser`);

const port = process.env.PORT || 8443;

const app = express();

app.use(bodyParser.json({ limit: `50mb` }));
app.use(bodyParser.urlencoded({ extended: true, limit: `50mb` }));

app.get(`/`, (req, res) => reciever(req, res, getAllRows));
app.get(`/hours`, (req, res) => reciever(req, res, getAllHours));
app.get(`/menu`, (req, res) => reciever(req, res, getAllMenu));

app.get(`/organization/coords`, (req, res) => reciever(req, res, getCoords));
app.get(`/organization/info/:id`, (req, res) =>
  reciever(req, res, getOrganizationInfo)
);
// app.get(`/organization/menu/:id`, (req, res) =>
//   reciever(req, res, getOrganizationMenu)
// );
// app.get(`/organization/reviews/:id`, (req, res) =>
//   reciever(req, res, getOrganizationReviews)
// );

app.post(`/organization/hours`, (req, res) => reciever(req, res, postHours));
app.post(`/organization/menu`, (req, res) => reciever(req, res, postMenu));
app.post(`/organization`, (req, res) => reciever(req, res, postOrganization));

app.listen(port, () => {
  console.log(`Server is running on port `, port);
});

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
let conn;
let pool = new Pool(dbConfig);

function reciever(req, res, func) {
  console.log(req.params, "reciever params");

  func(
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving customers.`,
        });
      else res.send(data);
    },
    req.body,
    req.params
  );
}

function getOrganizationInfo(sendBack, data, requestParams) {
  const sql = `SELECT name, address, url, phones, categories, rating, logo, menuFeatures, elseFeatures, organizationImages, userReviews, reviewsCategories,
  organizationHours.id, organizationHours.text, organizationHours.Everyday, organizationHours.Monday, organizationHours.Tuesday, organizationHours.Wednesday, organizationHours.Thursday, organizationHours.Friday, organizationHours.Saturday, organizationHours.Sunday from organizations
  JOIN organizationHours ON organizations.id=${requestParams.id}::varchar AND organizationHours.id=${requestParams.id}::varchar`;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

function getCoords(sendBack) {
  const sql = `SELECT coordinatesX, coordinatesY, id, name from organizations`;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

function postMenu(sendBack, data) {
  const sql = `INSERT INTO organizationMenu (id, category, title, image, description, price) 
  VALUES ($1, $2, $3, $4, $5, $6)
  ON CONFLICT (id) DO UPDATE 
    SET
      category = excluded.category, 
      title = excluded.title,
      image = excluded.image,
      description = excluded.description,
      price = excluded.price
  `;

  data.forEach((item, index) => {
    console.log(index);
    const sqlQueryData = Object.values(item);
    conn.query(sql, sqlQueryData, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      sendBack(err, result);
    });
  });
}

function postHours(sendBack, data) {
  const sql = `SELECT id from organizationHours WHERE id=${data.id}`;
  conn.query(sql, function (err, result) {
    if (result?.length > 0) {
      console.log(`put hours`, data.id);
      putHours(sendBack, data);
    } else {
      console.log(`insert hours`, data.id);
      insertHours(sendBack, data);
    }
  });
}

function putHours(sendBack, data) {
  const sqlQueryData = Object.values(data);
  const sql = `UPDATE organizationHours SET id = $1, text = $2, Everyday = $3, Monday = $4, Tuesday = $5, Wednesday = $6, Thursday = $7, Friday = $8, Saturday = $9, Sunday = $10 WHERE id=${data.id}`;
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

function insertHours(sendBack, data) {
  const sqlQueryData = Object.values(data);
  const sql = `INSERT INTO organizationHours (id, text, Everyday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

function postOrganization(sendBack, data) {
  const sql = `SELECT id from organizations WHERE id=${data.id}`;
  conn.query(sql, function (err, result) {
    if (result?.length > 0) {
      console.log(`put org`, data.id);
      putOrganization(sendBack, data);
    } else {
      console.log(`insert org`, data.id);
      insertOrganization(sendBack, data);
    }
  });
}

function putOrganization(sendBack, data) {
  const sqlQueryData = Object.values(data).map((item) => {
    if (Array.isArray(item)) {
      return item.join(`|`);
    }
    return item;
  });
  const sql = `UPDATE organizations SET coordinatesX = $1, coordinatesY = $2, name = $3, address = $4, id = $5, url = $6, phones = $7, categories = $8, rating = $9, logo = $10, menuFeatures = $11, elseFeatures = $12, organizationImages = $13, userReviews = $14, reviewsCategories = $15 WHERE id=${data.id}`;
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

function insertOrganization(sendBack, data) {
  const sqlQueryData = Object.values(data).map((item) => {
    if (Array.isArray(item)) {
      return item.join(`|`);
    }
    return item;
  });
  const sql = `INSERT INTO organizations (coordinatesX, coordinatesY, name, address, id, url, phones, categories, rating, logo, menuFeatures, elseFeatures, organizationImages, userReviews, reviewsCategories) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

async function getAllRows(sendBack) {
  console.log("getALl");
  const sql = `SELECT * from organizations`;
  await conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

async function getAllMenu(sendBack) {
  console.log("getAllHours");
  const sql = `SELECT * from organizationMenu`;
  await conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

async function getAllHours(sendBack) {
  console.log("getAllHours");
  const sql = `SELECT * from organizationHours`;
  await conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

async function dropMenuDatabase() {
  const sql = `DROP TABLE organizationMenu`;
  await conn.query(sql, function (err, result) {
    if (err) {
      if (err.errno === 1050) console.log(`table not destroyed`);
      return;
    }
    console.log(`Table destroyed`);
  });
}

async function dropHoursDatabase() {
  const sql = `DROP TABLE organizationHours`;
  await conn.query(sql, function (err, result) {
    if (err) {
      if (err.errno === 1050) console.log(`table not destroyed`);
      return;
    }
    console.log(`Table destroyed`);
  });
}

async function dropDatabase() {
  const sql = `DROP TABLE organizations`;
  await conn.query(sql, function (err, result) {
    if (err) {
      if (err.errno === 1050) console.log(`table not destroyed`);
      return;
    }
    console.log(`Table destroyed`);
  });
}

function handleDisconnect() {
  pool = new Pool(dbConfig);
  connectToDatabase();
}

async function connectToDatabase() {
  console.log("Before connect");
  conn = await pool.connect();
  console.log("Connected!");
  dropDatabase();
  dropHoursDatabase();
  dropMenuDatabase();

  const sql = `CREATE TABLE organizations (name VARCHAR(255), address VARCHAR(255), coordinatesX FLOAT, coordinatesY FLOAT, id VARCHAR(255), url VARCHAR(255), phones VARCHAR(255), categories VARCHAR(255),rating FLOAT, logo VARCHAR(255), menuFeatures TEXT, elseFeatures TEXT, organizationImages TEXT, userReviews TEXT, reviewsCategories TEXT)`;
  conn.query(sql, function (err, result) {
    if (err) {
      if (err.code === "42P07") console.log(`table already exist`);
      else console.log(err.code);
      return;
    }
    console.log(`Table created`);
  });

  const sqlOrganizationHours = `CREATE TABLE organizationHours (id VARCHAR(255), text VARCHAR(255), Everyday VARCHAR(255), Monday VARCHAR(255), Tuesday VARCHAR(255), Wednesday VARCHAR(255), Thursday VARCHAR(255), Friday VARCHAR(255), Saturday VARCHAR(255), Sunday VARCHAR(255))`;
  conn.query(sqlOrganizationHours, function (err, result) {
    if (err) {
      if (err.code === "42P07") console.log(`table Hours already exist`);
      else console.log(err);
      return;
    }
    console.log(`Table Hours created`);
  });

  const sqlOrganizationMenu = `CREATE TABLE organizationMenu (id VARCHAR(255) UNIQUE, category VARCHAR(255), title VARCHAR(255), image VARCHAR(255), description VARCHAR(255), price VARCHAR(255))`;
  conn.query(sqlOrganizationMenu, function (err, result) {
    if (err) {
      if (err.code === "42P07") console.log(`table Menu already exist`);
      else console.log(err);
      return;
    }
    console.log(`Table Menu created`);
  });
}
connectToDatabase();

// main();
