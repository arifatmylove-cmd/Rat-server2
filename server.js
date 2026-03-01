const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'screenshots/' });

app.use(express.static('public'));

// Screenshot endpoint
app.post('/screenshot', upload.single('image'), (req, res) => {
    console.log('Screenshot received:', req.file.filename);
    res.json({ status: 'ok' });
});

// Serve latest screenshot
app.get('/latest', (req, res) => {
    fs.readdir('screenshots', (err, files) => {
        if (files && files.length > 0) {
            const latest = files[files.length - 1];
            res.sendFile(path.join(__dirname, 'screenshots', latest));
        } else {
            res.status(404).send('No screenshots');
        }
    });
});

app.listen(3000, () => {
    fs.mkdirSync('screenshots', { recursive: true });
    fs.mkdirSync('public', { recursive: true });
    console.log('Server running on port 3000');
});
