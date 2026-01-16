const { db1, db2, userdb } = require('../models/db');

// MySQLデータベースに接続
function connectDatabases() {
    db1.connect((err) => {
        if (err) throw err;
        console.log('✅ MySQL db1 Connected!');
    });
    
    db2.connect((err) => {
        if (err) throw err;
        console.log('✅ MySQL db2 Connected!');
    });
    
    userdb.connect((err) => {
        if (err) throw err;
        console.log('✅ MySQL userdb Connected!');
    });
}

module.exports = connectDatabases;
