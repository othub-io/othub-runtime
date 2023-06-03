const apiSpamProtection = require("./apiSpamProtection");
const work = require("./work");
const webSpamProtection = require("./webSpamProtection");

const queryTypes = [
  {
    name: "webSpamProtection",
    getData: () => spam(request, ip),
  },
  {
    name: "work",
    getData: () => work(body),
  },
  {
    name: "apiSpamProtection",
    getData: () => apiSpam(type,api_key),
  },
];

module.exports = {
webSpamProtection: function webSpamProtection() {
    return queryTypes[0];
  },

  work: function work() {
    return queryTypes[1];
  },

apiSpamProtection: function apiSpamProtection() {
    return queryTypes[2];
  },
};
