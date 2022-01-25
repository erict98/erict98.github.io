/* This JavaScript will handle the DB connections and all HTTPs requests
   DB schema: cohorts > First Name | Last Name | Cohort | Technical Track | Location | Profile */

export class Database {
  mysql;
  pool;
  statement;

  constructor() {
    this.mysql = require("mysql");

    this.pool = this.mysql.createPool({
      connectionLimit : "",
      host            : "",
      user            : "",
      password        : "",
      database        : ""
    });

    this.statement = "";
  }

  /**
   * Queries the database and returns the table.
   * Does not prevent SQL injections so do not allow user to manually input data.
   * 
   * @param  {String array}   params  selected cohorts ["Alpha", ...]
   * @return {Object array}   result  [{row1}, {row2}, ..., {rowN}]
   */
  createTable(params) {
    this.statement = "SELECT * FROM cohorts WHERE";

    // builds the SQL statement
    if (params.length > 0) {
      this.statement += " cohort = " + params[0];
      for (let i = 1; i < params.length; i++) {
        this.statement += " OR cohort = " + params[i];
      }

    // if no parameters were selected, return an empty result
    } else {
      this.statement += " false";
    }

    // executes the SQL statement
    pool.query(this.statement + " ORDER BY Cohort ASC", function(err, result, fields) {
      if (err) {
        console.log(err);
        next(err);
        return;
      } else { return result; }});
  }

  /**
   * Extends the SQL statement to perform additional sorting and updates the table accordingly.
   * Does not prevent SQL injections so do not allow user to manually input data.
   * 
   * @param  {String array}   params  [col1, col2, ...]
   * @return {Object array}   result  [{row1}, {row2}, ..., {rowN}]
   */
  updateTable(params) {
    let sort_query = this.statement + " ORDER BY";
    for (let i = 0; i < params.length - 1; i++) {
      sort_query += " " + params[i];
    }
    sort_query += " " + params.at(-1);

    // executes the SQL statement
    this.pool.query(sort_query, function(err, result, fields) {
      if (err) {
        console.log(err);
        next(err);
        return;
      } else { return result; }});
  }
}


