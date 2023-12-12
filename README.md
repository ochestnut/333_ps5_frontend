# 333_ps5_frontend
includes the frontend unit tests for the login and register views

For setup, the configurations used were nearly if not exactly the same as those supplied in the tutorial, but I will give them anyway...

babel.config.js

/*This allows jest to work with react.*/
module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {
        //This deals with "React is not defined" error. Pulled from React17 Documentation.
        "runtime": "automatic"
    }]
    ]
}

jest.config.js

// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  }
};

package.json

{
  "name": "finx",
  "version": "0.1.0",
  "private": true,
  "homepage": "./",
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.11.41",
    "@types/react": "^18.0.14",
    "@types/react-dom": "^18.0.5",
    "ag-grid-community": "^29.1.0",
    "ag-grid-react": "^29.1.0",
    "antd": "^5.9.4",
    "axios": "^1.3.2",
    "babel-jest": "^29.7.0",
    "jest-enzyme": "^7.1.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-intl-universal": "^2.5.3",
    "react-router-dom": "^6.18.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "jest",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "jest": "^27.0.0",
    "jest-environment-jsdom": "^27.0.0",
    "@babel/preset-react": "^7.22.15",
    "customize-cra": "^1.0.0",
    "enzyme": "^3.11.0",
    "enzyme-adapter": "^0.0.1-security.0",
    "react-app-rewired": "^2.2.1",
    "react-test-renderer": "^18.2.0"
  }
}

I believe these are all the necessary config files in order to run these tests... Of course having a react app and adding these to the src of that app is required as well, and these config files I kept in the root of the project.

When I ran the tests with this configuration, I got two tests passing with 6 tests checked and passed...

** I initially kept these frontend tests in a repo that included the whole project, and didnt realize that the actual files in the src were not actually in the repo, it was just an empty shell of a folder named repo. That is why I made this repo and everything came in within one push... Although, most of it was error checking what I wrote as a template and then committing once I finished the full test anyway.
