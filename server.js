const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// قائمة القنوات الخاصة بك (يمكنك إضافة أي قناة تريدها هنا مستقبلاً)
const channels = [
  {
    name: "Al Jazeera Arabic - الجزيرة مباشر",
    category: "News",
    url: "https://live-hls-web-aje.akamaized.net/hls/live/2026817/AJE/master_1080p.m3u8"
  },
  {
    name: "BBC Arabic - بي بي سي عربي",
    category: "News",
    url: "https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_arabic_tv/pc_hd_v1.m3u8"
  },
  {
    name: "France 24 Arabic - فرانس 24",
    category: "News",
    url: "https://stream.f24.media/f24/ar/f24_ar.m3u8"
  }
];

// نقطة النهاية لتوليد قائمة M3U الخاصة بتطبيق IPTV Smarters Pro
app.get('/playlist.m3u', (req, res) => {
  let playlist = "#EXTM3U\n";
  
  channels.forEach((channel) => {
    playlist += `#EXTINF:-1 group-title="${channel.category}", ${channel.name}\n`;
    playlist += `${channel.url}\n`;
  });

  res.header('Content-Type', 'audio/x-mpegurl');
  res.header('Access-Control-Allow-Origin', '*');
  res.send(playlist);
});

// الصفحة الرئيسية لتأكيد عمل السيرفر
app.get('/', (req, res) => {
  res.send('<h1>IPTV Server is Running Successfully!</h1><p>Use /playlist.m3u for IPTV Smarters Pro</p>');
});

app.listen(PORT, () => {
  console.log(`IPTV Server is active on port ${PORT}`);
});
