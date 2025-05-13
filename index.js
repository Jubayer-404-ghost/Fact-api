const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let facts = [];

try {
  const filePath = path.join(__dirname, 'fact.json'); // __dirname দিয়ে পাথ ঠিক করা
  const data = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(data);
  facts = parsed.facts || [];
} catch (error) {
  console.error('Could not read fact.json:', error);
}

app.get('/fact', (req, res) => {
  if (facts.length === 0) {
    return res.status(500).json({ status: "error", message: 'No facts available' });
  }

  const fact = facts[Math.floor(Math.random() * facts.length)];

  const response = {
    status: "success",
    fact: `❏ আচ্ছা আপনি কি এনা জানেন? ❑\n\n➪ যে ${fact} ❞\n\n𝗔𝗨𝗧𝗛𝗢𝗥 : 🎀 𝗝𝗨𝗕𝗔𝗬𝗘𝗥 🎀`,
    author: {
      name: "Jubayer",
      facebook: "https://www.facebook.com/profile.php?id=61573052122735"
    }
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
