const fs = require("fs");
const path = require("path");

const generateImage = (image) => {
  const OUTPUT_DIR = path.resolve(__dirname, "../output");
  const IMAGE_DIR = path.join(OUTPUT_DIR, "./images");
  const outputPathImage = path.join(IMAGE_DIR, "./screenshot.jpg");

  const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};

  if (matches.length !== 3) {
      return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer.from(matches[2], "base64");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR);
  }

  fs.writeFileSync(outputPathImage, response.data, (err) => {
    if (err) throw err;

    console.log("Successfully made the image!");
  });
};

module.exports = generateImage;
