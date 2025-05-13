const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/fact", (req, res) => {
  const videoFilePath = path.join(__dirname, "fact.json");

  fs.readFile(videoFilePath, "utf8", (err, videoData) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Error reading fact.json"
      });
    }

    try {
      const videos = JSON.parse(videoData);
      if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(500).json({
          status: "failed",
          error: "No videos found in video.json"
        });
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    const response = {
        status: "success",
        fact: `❏ আচ্ছা আপনি কি এনা জানেন? ❑\n\n➪ যে ${randomFact} ❞\n\n𝗔𝗨𝗧𝗛𝗢𝗥 : 🎀 𝗝𝗨𝗕𝗔𝗬𝗘𝗥 🎀`,
        author: {
          name: "Jubayer",
          facebook: "https://www.facebook.com/profile.php?id=61573052122735"
        }
      };
      
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(response, null, 2));
    } catch (parseError) {
      res.status(500).json({
        status: "failed",
        error: "Error parsing video.json"
      });
    }
  });
});

const PORT = process.env.PORT || 2929;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
