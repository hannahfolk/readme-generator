const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const generateLicense = require("../controllers/generateLicense");
const generateREADME = require("../controllers/generateREADME");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPathREADME = path.join(OUTPUT_DIR, "README.md");
const outputPathLicense = path.join(OUTPUT_DIR, "LICENSE.txt");

router.post("/generate", (req, res) => {
  const { formObject, techState, ackState } = req.body;

  const licenseStr = generateLicense(formObject);
  const READMEStr = generateREADME(formObject, techState, ackState);
  console.log(READMEStr);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPathLicense, licenseStr, "utf-8");
  fs.writeFileSync(outputPathREADME, READMEStr, "utf-8");

  console.log("Success!");
});

module.exports = router;
