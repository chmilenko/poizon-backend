const path = require('path');
const fs = require('fs');

// мидлварка для чтения файлов из статики
const publicPath = path.join(__dirname, '../public/');

function staticMiddleware(req, res, next) {
  const filePath = path.join(publicPath, req.path);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    next();
  }
}

module.exports = staticMiddleware;
