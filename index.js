const contract = require("truffle-contract");
const AETH = require("./build/contracts/AETH.json");
const Comments = require("./build/contracts/Comments.json");
const Entries = require("./build/contracts/Entries.json");
const Essence = require("./build/contracts/Essence.json");
const Feed = require("./build/contracts/Feed.json");
const ProfileRegistrar = require("./build/contracts/ProfileRegistrar.json");
const ProfileResolver = require("./build/contracts/ProfileResolver.json");
const Tags = require("./build/contracts/Tags.json");
const Votes = require("./build/contracts/Votes.json");

module.exports = async function init(web3Provider) {
  const contracts = {
    AETH: AETH,
    Comments: Comments,
    Entries: Entries,
    Essence: Essence,
    Feed: Feed,
    ProfileRegistrar: ProfileRegistrar,
    ProfileResolver: ProfileResolver,
    Tags: Tags,
    Votes: Votes
  };

  const exported = {};
  const exportValue = function (val) {
    return {
      enumerable: true,
      configurable: false,
      writable: false,
      value: val
    }
  };
  const binds = Object.keys(contracts).map(
    function (contractName) {
      const instance = contract(contracts[contractName]);
      instance.setProvider(web3Provider);
      if(contractName === 'AETH'){
        return instance.at('0xc0bfcdee0fa3476be4a1d1be36e78b9f7b9f107c').then(function (data) {
          Object.defineProperty(exported, contractName, exportValue(data));
        });
      }
      return instance.deployed().then(function (data) {
        Object.defineProperty(exported, contractName, exportValue(data));
      });
    }
  );
  await Promise.all(binds);

  return exported;
};
