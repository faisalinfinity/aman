const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const dirname="C:\\Users\\mujta\\Downloads"

app.use(express.static(path.join(dirname, 'public')));

app.get('/list-files', (req, res) => {
    const files = fs.readdirSync(dirname);
    const fileList = files.map(file => `<li><a href="/view/${file}">${file}</a></li>`).join('');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Local Files Ex0plorer</title>
      </head>
      <body>
        <h1>Local Files Explorer</h1>
        <ol>${fileList}</ol>
      </body>
      </html>
    `;
    res.send(html);
});


app.get('/view/:file', (req, res) => {
    const requestedFile = req.params.file;
    const filePath = path.join(dirname, requestedFile);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found.');
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
