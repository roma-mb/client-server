## User Management Client Server

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api">Api</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
### About The Project

API Client for managing users

### Built With

[![node][nodejs.org]][node-url]

[//]: # (<p align="right">&#40;<a href="#readme-top">back to top</a>&#41;</p>)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple example steps.

### Prerequisites

* Node v22.12.0
  ```sh
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash # Download and install nvm:
    nvm install 22 # Download and install Node.js:
    node -v # Should print "v22.12.0".
    nvm current # Should print "v22.12.0".
    npm -v # Should print "10.9.0".
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:roma-mb/client-server.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Copy frontend project, after cloning

   Clone in a folder project
   ```sh
   git clone https://github.com/roma-mb/user-management
   ```
   After, copy all `user-management` folders, go to project `client-server` in the public folder, remove all files and paste all user-management copied content.
   ```sh
   sudo rm -rf ~/projects/client-server/public/*
   cd -r ~/projects/user-management/* ~/projects/client-server/public
   ```
   Go to `~/projects/client-server/public` copy index.html file and past in `~/projects/client-server/views` and rename to extension .ejs
   ```sh
   mv ~/projects/client-server/public/index.html ~/projects/client-server/views/index.ejs
   ```
4. Start Server
   ```sh
    npm start
   ```

<!-- USAGE EXAMPLES -->
## Usage

After starting the server access `localhost:3000`. 

## API

[Postman](https://www.postman.com/rom-mb/user-management/collection/y6a2zgk/user-management-api?action=share&creator=6885147)

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[nodejs.org]: https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript 