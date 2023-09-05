const proxy = require("http-proxy-middleware");

module.exports = function(app) {

    app.use(proxy("/api", { target: "http://18.222.143.17:5000/" }));

};