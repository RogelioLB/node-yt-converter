const fs = require("fs");

module.exports = { fileExist: (pathname) => fs.existsSync(pathname) }
