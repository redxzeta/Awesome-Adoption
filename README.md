[![Netlify Status](https://api.netlify.com/api/v1/badges/e4f299c9-c989-48e7-98c6-a9e259ddfb0f/deploy-status)](https://app.netlify.com/sites/hardcore-morse-df1d25/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/redxzeta/Awesome-Adoption/actions/workflows/node.js.yml/badge.svg)](https://github.com/redxzeta/Awesome-Adoption/actions/workflows/node.js.yml)

# PawternityHub

![image](https://user-images.githubusercontent.com/55101825/193477678-ca458235-d786-44bb-83cd-b3b3e2e9920f.png)
![image](https://user-images.githubusercontent.com/55101825/193477686-cb8e8cf3-2b72-48a0-bed0-5afe64875882.png)

A web application that helps users find pets to adopt around their area. It started out as a Hackathon project and then Open Source during Hacktoberfest All levels are welcome to contribute.

## Contribution

Read Here [Contribution](https://github.com/redxzeta/Awesome-Adoption/blob/main/CONTRIBUTING.md)

## Tech Stack Used

- React
- Tailwind
- Supabase
- Daisy UI

## Pet Finder Developer API Key

Register for an api key here [PetFinder](https://www.petfinder.com/developers/)

Create an `.env` file in root folder

In the `.env` file put

`REACT_APP_PETFINDER_KEY = YOURAPIKEY`
`REACT_APP_PETFINDER_SECRET = YOURSECRETKEY`

Restart the app

This project now uses vite [vite](https://vite.dev/).

## Supabase

# SEEMS TO NOT WORK ANY LONGER (02/2025)

Join My [Discord](https://discord.gg/2UxwrKxCPV) for the Supabase keys, which need to be in .env

## Setup

`yarn`

`yarn prepare`

`yarn start`

test

`yarn test`

## Errors Fix

If you are getting this
`InvalidTokenError: Invalid token specified: Cannot read properties of undefined (reading 'replace')`

go to dev tools-> application storage-> local storage

Delete the token

## Available Scripts

### Installing Yarn

`npm install --global yarn`

## After Installing Yarn

`yarn install `

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn format`

Formats the code.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
""

## Instructions on installing yarn and differences between yarn and using npm

# Yarn

Yarn is a package manager for your code. It allows you to use and share (e.g. JavaScript) code with other developers from around the world. Yarn does this quickly, securely, and reliably so you don’t ever have to worry. Yarn allows you to use other developers’ solutions to different problems, making it easier for you to develop your software. If you have problems, you can report issues or contribute back, and when the problem is fixed, you can use Yarn to keep it all up to date. Code is shared through something called a package (sometimes referred to as a module). A package contains all the code being shared as well as a package.json file which describes the package
Both NPM and yarn are package Managers that help in Managing Project Dependencies

# Npm

npm is the world's largest software registry. Open source developers from every continent use npm to share and borrow packages, and many organisations use npm to manage private development as well.
npm consists of three distinct components:

- the website
- the Command Line Interface (CLI)
- the registry
  Use the website to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up organisations to manage access to public or private packages.
  The CLI runs from a terminal, and is how most developers interact with npm.
  The registry is a large public database of JavaScript software and the meta-information surrounding it.

## Setting up prettier in vscode and auto format on save

Ways to Install Prettier as a VS Code Extension:

1. In vscode, search up prettier in extensions and install
2. To set up auto format on save, go to settings
3. search `format save` and check it
4. be sure to select prettier as your formatter

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
