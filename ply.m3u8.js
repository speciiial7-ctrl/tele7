// ply.m3u8.js
// Generates a dynamic M3U8 playlist from a stream URL

const express = require('express');
const app = express();

app.get('/ply.m3u8', (req, res) => {
    const url = req.query.url || '';

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!url) {
        res.status(400).send(
            `#EXTM3U\n#EXTINF:-1, Missing ?url parameter\n`
        );
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        res.status(400).send(
            `#EXTM3U\n#EXTINF:-1, Invalid URL\n`
        );
        return;
    }

    const playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-ALLOW-CACHE:NO

#EXTINF:10.0, LIVE
${url}
`;

    res.send(playlist);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
