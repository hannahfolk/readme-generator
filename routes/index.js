const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const generateREADME = require("../controllers/generateREADME");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPath = path.join(OUTPUT_DIR, "README.md");

router.post("/generateREADME", (req, res) => {
  const { formObject } = req.body;

  const readMeStr = generateREADME(formObject);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, readMeStr, "utf-8");
});

module.exports = router;
