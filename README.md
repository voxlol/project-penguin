Project Penguin
======
[![Build Status](https://travis-ci.org/voxlol/project-penguin.svg?branch=master)](https://travis-ci.org/voxlol/project-penguin)

Side project by Allen Chang [Github](https://www.github.com/voxlol)

### Goal
Build a full stack web application with good build tools, CI, testing, and utilizes latest web technologies.

### Project Description
A stock screener that is customizable and scalable.

Frontend - React + Bacon.js
Backend - Node.js
DB - MongoDB & InfluxDB

### Technologies Used
* **Babel** -> to gain ES6 functionality
* **Webpack** -> module tool
* **ESLint** -> linter for ES6
* **Mocha**/Chai -> testing framework
* **Bacon**.JS -> functional reactive programming
* **Immutable** -> for creating immutable data structures
* **React** -> view

Usage
======
    npm i
    gulp start:www
    gulp start:api

Build
======
    gulp build:api
    gulp build:www

Run Tests
======
    gulp test

Run Lint
======
    gulp vet