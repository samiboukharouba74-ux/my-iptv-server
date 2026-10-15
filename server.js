const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// استدعاء أحدث القنوات المباشرة (الجزائرية + الفرنسية + العربية الشائعة) تلقائياً
app.get('/playlist.m3u', async (req, res) => {
  try {
    // 1. جلب القنوات الجزائرية (dz)
    const dzRes = await axios.get('https://iptv-org.github.io/iptv/countries/dz.m3u');
    // 2. جلب القنوات الفرنسية (fr)
    const frRes = await axios.get('https://iptv-org.github.io/iptv/countries/fr.m3u');
    // 3. جلب القنوات العربية العامة والمجانية (ar)
    const arRes = await axios.get('https://iptv-org.github.io/iptv/languages/ar.m3u');

    // دمج كافة القنوات في قائمة واحدة
    let combinedPlaylist = "#EXTM3U\n";
    combinedPlaylist += "\n# === ALGERIAN CHANNELS (الجزائر) ===\n" + dzRes.data.replace('#EXTM3U', '');
    combinedPlaylist += "\n# === ARABIC CHANNELS (العالم العربي) ===\n" + arRes.data.replace('#EXTM3U', '');
    combinedPlaylist += "\n# === FRENCH CHANNELS (فرنسا) ===\n" + frRes.data.replace('#EXTM3U', '');

    res.header('Content-Type', 'audio/x-mpegurl');
    res.header('Access-Control-Allow-Origin', '*');
    res.send(combinedPlaylist);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).send("Error generating playlist");
  }
});

app.get('/', (req, res) => {
  res.send('<h1>IPTV Server is Live & Fully Auto-Updated!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
