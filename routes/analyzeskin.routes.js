const express = require('express')
const http = require('http');
const fs = require('fs');
const router = express.Router()
const dotenv = require('dotenv')


dotenv.config()

router.post('/analyzeImage', async (req, res) => {
    try {
      const autodermApikey = process.env.AutodermApikey; 
      const request = http.request({
        method: 'POST',
        hostname: 'autoderm.firstderm.com',
        path: '/v1/query',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Api-Key': autodermApikey,
        },
      });
  
      const fileStream = fs.createReadStream(req.files.file.path);
      fileStream.pipe(request);
  
      request.on('res', async (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          res.json(JSON.parse(data));
        });
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router