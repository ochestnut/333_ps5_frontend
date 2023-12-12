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
