const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/fact", (req, res) => {
  const factFilePath = path.join(__dirname, "fact.json");

  fs.readFile(factFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Could not read fact.json file"
      });
    }

    try {
      const parsed = JSON.parse(data);
      const facts = parsed.facts;

      if (!Array.isArray(facts) || facts.length === 0) {
        return res.status(404).json({
          status: "failed",
          error: "No facts found"
        });
      }

      const randomFact = facts[Math.floor(Math.random() * facts.length)];

      const response = {
        status: "success",
        fact: `❏ আচ্ছা আপনি কি এনা জানেন? ❑\n\n➪ যে ${randomFact} ❞\n\n𝗔𝗨𝗧𝗛𝗢𝗥 : 🎀 𝗝𝗨𝗕𝗔𝗬𝗘𝗥 🎀`,
        author: {
          name: "Jubayer",
          facebook: "https://www.facebook.com/profile.php?id=61573052122735"
        }
      };

      res.json(response);
    } catch (err) {
      res.status(500).json({
        status: "failed",
        error: "Invalid JSON format in fact.json"
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
