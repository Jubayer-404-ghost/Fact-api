const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/fact", (req, res) => {
  const videoFilePath = path.join(__dirname, "fect.json");

  fs.readFile(videoFilePath, "utf8", (err, videoData) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Fact not available "
      });
    }

    try {
      const videos = JSON.parse(videoData);
      if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(500).json({
          status: "failed",
          error: "No videos found in Fact"
        });
      }

      const randomFact = videos[Math.floor(Math.random() * fact.length)];

      const response = {
        status: "success",
        url: fact,
        author: {
          Name: "Jubayer",
          Facebook: "https://www.facebook.com/profile.php?id=61573052122735"
        }
      };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(response, null, 2));
    } catch (parseError) {
      res.status(500).json({
        status: "failed",
        error: "Error Fact"
      });
    }
  });
});

const PORT = process.env.PORT || 2929;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
