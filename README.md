## React and React Native npm package boilerplate with Typescript support
----

### About
This boilerplate make it easier to create npm package from Typescript projects.

The project is intended to be used with the latest Active LTS release of [Node.js][nodejs]. 


### Getting Started

To start, just clone the repository with following commands:

```sh
git clone https://github.com/pankod/react-typescript-npm-package-boilerplate

cd react-typescript-npm-package-boilerplate

npm install
```

 **Then run the following commands for:**

 **Babel build** : 
```sh 
$ npm run babel-build
```

 **Typescript build** : 
```sh 
$ npm run ts-build
```

#### This boilerplate includes:

- Typescript 3
- TSLint with Microsoft rules
- Jest and Enzyme support,
- Simple example of TypeScript code
- .editorconfig for consistent file format

**You should change the lines on package.json:**

If you develop React for web:

```json
"devDependencies:{
  "@types/react": "^16.8.5", // or @latest
  "@types/react-dom": "^16.8.2", // or @latest
},

"peerDependencies": {
    "react": "*",
    "react-dom": "*",
}
```
or React-Native development environment 
```json
"devDependencies:{
  "@types/react": "^16.8.5", // or @latest
  "@types/react-native": "^16.8.2", // or @latest
},

"peerDependencies": {
    "react": "*",
    "react-native": "*",
}
```
