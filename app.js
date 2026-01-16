require('dotenv').config();

const app = require('./config/app');
const connectDatabases = require('./config/database');

// APIルートの設定
const apiRegister = require('./routes/api/register');
const apiLogin = require('./routes/api/login');
const apiAdd = require('./routes/api/add');
const apiUpdate = require('./routes/api/update');
const apiDelete = require('./routes/api/delete');
const apiAddDone = require('./routes/api/add_done');
const apiAddWant = require('./routes/api/add_want');
const apiDeleteWant = require('./routes/api/want_delete');

// ページルートの設定
const indexRoutes = require('./routes/index');
const booksRoutes = require('./routes/books');
const wantsRoutes = require('./routes/wants');
const authRoutes = require('./routes/auth');

// APIルートのマウント
app.use('/api/register', apiRegister);
app.use('/api/login', apiLogin);
app.use('/api/add', apiAdd);
app.use('/api/update', apiUpdate);
app.use('/api/delete', apiDelete);
app.use('/api/add_done', apiAddDone);
app.use('/api/add_want', apiAddWant);
app.use('/api/want_delete', apiDeleteWant);

// ページルートのマウント
app.use('/', indexRoutes);
app.use('/', booksRoutes);
app.use('/', wantsRoutes);
app.use('/', authRoutes);

// データベース接続の初期化
connectDatabases();

// サーバーの起動
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 サーバー起動中： http://localhost:${port}`);
});
