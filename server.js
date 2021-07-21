var port = process.env.PORT || 80;

const express = require('express');
const nocache = require('nocache');
const app = express();
const history = require('connect-history-api-fallback');
const public_html = process.env.NODE_ENV === "beta" ? "beta" : "public";

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(history());
app.use(express.static(public_html));

module.exports = app;

app.listen(port, () => {
	console.log(`서버가 ${port}번 포트에서 정상적으로 작동합니다.`);
});

