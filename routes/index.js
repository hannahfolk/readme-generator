const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const generateLicense = require("../controllers/generateLicense");
const generateREADME = require("../controllers/generateREADME");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPathReadME = path.join(OUTPUT_DIR, "README.md");
const outputPathLicense = path.join(OUTPUT_DIR, "LICENSE.txt");

router.post("/generate", (req, res) => {
  const { formObject } = req.body;

  const licenseStr = generateLicense(formObject);
  const readMeStr = generateREADME(formObject);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPathLicense, licenseStr, "utf-8");
  fs.writeFileSync(outputPathReadME, readMeStr, "utf-8");
});

module.exports = router;
