"use strict";

let app = require("http").createServer(routeSetting),
    fs = require("fs"),
    url = require("url"),
    path = require("path"),
    settings = require("./settings");

app.listen(settings.PORT);

function routeSetting(req, res) {
    const pathname = url.parse(req.url).pathname;
    const filename = path.basename(pathname);
    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(fs.readFileSync(settings.TOP_PAGE))
    }
    res.end();
}
