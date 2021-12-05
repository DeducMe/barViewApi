let conn;

export function setGlobalConn(propConn) {
  conn = propConn;
}

export function getGlobalConn() {
  return conn;
}

export function reciever(req, res, func) {
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

export function createTable(sql, errLog, successLog) {
  conn.query(sql, function (err, result) {
    if (err) {
      if (err.code === "42P07") console.log(errLog);
      else console.log(err.code);
      return;
    }
    console.log(successLog);
  });
}

export async function dropTable(sql, errLog, successLog) {
  await conn.query(sql, function (err, result) {
    if (err) {
      if (err.errno === 1050) console.log(errLog);
      return;
    }
    console.log(successLog);
  });
}

export function simpleQuery(sql) {
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

export function simpleQueryWithResult(sql, sendBack) {
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

export function dataQueryWithResult(sql, sqlQueryData, sendBack) {
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
}

export async function resultQuery(sql) {
  await conn.query(sql, function (err, result) {
    return result;
  });
}
