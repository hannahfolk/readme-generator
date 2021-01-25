const generateImage = require("./generateImage");

const generateREADME = (formObject, techState, ackState) => {
  const {
    acknowledgements,
    builtWith,
    contributing,
    description,
    email,
    imagePreview,
    installation,
    license,
    linkedIn,
    projectName,
    repoName,
    twitter,
    usage,
    username,
  } = formObject;
  let licenseSection;

  const builtWithMapped = techState.map((tech) => {
    return `* [${tech.techName}](${tech.techURL})`;
  });

  const acknowledgementsMapped = ackState.map((acknowledgement) => {
    return `* [${acknowledgement.name}](${acknowledgement.url})`;
  });

  if (license === "none") {
    licenseSection = ``;
  } else {
    licenseSection = `## License
        
This project uses the [${license}][license-url] license.`;
  }

  if (imagePreview !== "" && imagePreview != null) {
    generateImage(imagePreview);
  }

  return `# ${projectName}
![GitHub repo size](https://img.shields.io/github/repo-size/${username}/${repoName})
![GitHub contributors](https://img.shields.io/github/contributors/${username}/${repoName})
![GitHub stars](https://img.shields.io/github/stars/${username}/${repoName}?style=social)
![GitHub forks](https://img.shields.io/github/forks/${username}/${repoName}?style=social)
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
    
${description}
    
<a href="https://github.com/${username}/${repoName}"><strong>Explore the docs »</strong></a>
    
<a href="https://${username}/github.io/${repoName}">View Demo</a>
·
<a href="https://github.com/${username}/${repoName}/issues">Report Bug</a>
·
<a href="https://github.com/${username}/${repoName}/issues">Request Feature</a>
    
## Table of Contents
    
* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Contact](#contact)
* [License](#license)
* [Acknowledgements](#acknowledgements)
    
## About The Project
    
[![Product Name Screen Shot][product-screenshot]]()

${
  builtWithMapped.length > 0
    ? `
### Built With
      
${builtWithMapped}`
    : ``
}    
    
## Getting Started
    
To get a local copy up and running follow these simple steps.
    
### Prerequisites
    
This is an example of how to list things you need to use the software and how to install them.
* npm
\`\`\`sh
npm install npm@latest -g
\`\`\`
    
### Installation
    
1. Clone the repo
\`\`\`sh
git clone https://github.com/${username}/${repoName}.git
\`\`\`
2. Install NPM packages
\`\`\`sh
npm install
\`\`\`
    
    
## Using ${projectName}
    
${usage}
    
    
## Contact
    
If you want to contact me you can reach me at [${email}](${email}).
    
    
${licenseSection}
    
${
  acknowledgementsMapped.length > 0
    ? `
## Acknowledgements
      
${acknowledgementsMapped}`
    : ``
}

[repo-size-shield]: https://img.shields.io/github/repo-size/${username}/${repoName}
[contributors-shield]: https://img.shields.io/github/contributors/${username}/${repoName}
[contributors-url]: https://github.com/${username}/${repoName}/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/${username}/${repoName}
[forks-url]: https://github.com/${username}/${repoName}/network/members
[stars-shield]: https://img.shields.io/github/stars/${username}/${repoName}?style=social
[stars-url]: https://github.com/${username}/${repoName}/stargazers
[issues-shield]: https://img.shields.io/github/issues/${username}/${repoName}
[issues-url]: https://github.com/${username}/${repoName}/issues
[license-shield]: https://img.shields.io/badge/license-${license}-green
[license-url]: https://github.com/${username}/${repoName}/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?&logo=linkedin&colorB=555
[linkedin-url]: ${linkedIn}
[product-screenshot]: images/screenshot.jpg`;
};

module.exports = generateREADME;
