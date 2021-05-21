const client = require("mysql2");

const connection = client.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "пароль_от_сервера"
});

module.exports = class dbHelper {
    static scoutLog(data){
        let sqlInsert;
        if (data.volume) {
            sqlInsert = "INSERT INTO Tasks(time, status, id, engineerId, volume)" +
                "VALUES(data.time, data.status, data.id, data.engineerId, data.volume)";
        } else {
            sqlInsert = "INSERT INTO Tasks(time, status, id, engineerId)" +
                "VALUES(data.time, data.status, data.id, data.engineerId)";
        }

        connection.query(sqlInsert);
    }
}