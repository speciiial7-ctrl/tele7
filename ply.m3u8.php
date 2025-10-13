<?php
// ply.m3u8.php
// يولّد ملف M3U8 ديناميكي من رابط بث (url)

header('Content-Type: application/vnd.apple.mpegurl');
header('Access-Control-Allow-Origin: *');

$url = $_GET['url'] ?? '';

if (!$url) {
    http_response_code(400);
    echo "#EXTM3U\n#EXTINF:-1, Missing ?url parameter\n";
    exit;
}

if (!preg_match('/^https?:\/\//i', $url)) {
    http_response_code(400);
    echo "#EXTM3U\n#EXTINF:-1, Invalid URL\n";
    exit;
}

echo "#EXTM3U\n";
echo "#EXT-X-VERSION:3\n";
echo "#EXT-X-TARGETDURATION:10\n";
echo "#EXT-X-MEDIA-SEQUENCE:0\n";
echo "#EXT-X-ALLOW-CACHE:NO\n\n";
echo "#EXTINF:10.0, LIVE\n";
echo $url . "\n";
