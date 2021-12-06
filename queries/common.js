let conn;

exports.setGlobalConn = (propConn) => {
  conn = propConn;
};

exports.getGlobalConn = () => {
  return conn;
};

exports.reciever = (req, res, func) => {
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
};

exports.createTable = (sql, errLog, successLog) => {
  conn.query(sql, function (err, result) {
    if (err) {
      if (err.code === "42P07") console.log(errLog);
      else console.log(err.code);
      return;
    }
    console.log(successLog);
  });
};

exports.dropTable = async (sql, errLog, successLog) => {
  await conn.query(sql, function (err, result) {
    if (err) {
      if (err.errno === 1050) console.log(errLog);
      return;
    }
    console.log(successLog);
  });
};

exports.simpleQuery = (sql) => {
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
  });
};

exports.simpleQueryWithResult = (sql, sendBack) => {
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
};

exports.dataQueryWithResult = (sql, sqlQueryData, sendBack) => {
  conn.query(sql, sqlQueryData, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    sendBack(err, result);
  });
};

exports.callbackQuery = (sql, callback) => {
  conn.query(sql, callback);
};
