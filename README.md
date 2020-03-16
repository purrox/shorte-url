# shorte-url

## Description
A simple url shortener.

### Technologies
* nodejs express
* reactjs.
* sqlite3 in-memory database.

### Folder Organization
```
project
│   README.md
│   app.js
│   dataBaseConfiguration.js
│   package.json
└───bin
│   │  wwww.js //express server
└───components
│   └─── url
│       │  controller.js
│       │  helper.js
│       │  model.js
│       │  routes.js
│       │  service.js.
└───client (React App)
│   └─── build
│   ... other folders
```
### How to run?

Install project dependencies.
```terminal
npm run install
```
Run project.
```terminal
npm run serve
```