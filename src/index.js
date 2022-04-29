const { question } = require('readline-sync');

function allKeysInDictionary(dictionary) {
  const dictionaryKeys = Object.keys(dictionary);

  if (dictionaryKeys.length) {
    dictionaryKeys.forEach((key, index) => {
      console.log(`${index + 1}) ${key}`);
    });
  } else {
    console.log(`(empty set)`);
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function addMemberToKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const value = trimmedInput.shift();

  if (Object.keys(dictionary).includes(key)) {
    if (dictionary[key] && dictionary[key].includes(value)) {
      console.log(`ERROR, member ${value} already exists for ${key}`);
    } else {
      dictionary[key].push(value);
      addedMessage();
    }
  } else {
    dictionary[key] = [];
    dictionary[key].push(value);
    addedMessage();
  }

  function addedMessage() {
    console.log('Added');
    console.log('Dictionary: ' + JSON.stringify(dictionary));
  }
}

function allMembersInDictionary(dictionary) {
  const dictionaryKeys = Object.keys(dictionary);

  if (dictionaryKeys.length) {
    const allMembers = []

    dictionaryKeys.forEach((key) => {
      const membersByKey = dictionary[key];
      membersByKey.forEach((member) => allMembers.push(member));
    });

    allMembers.forEach((member, index) => {
      console.log(`${index + 1}) ${member}`);
    });
  } else {
    console.log(`(empty set)`);
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function checkIfKeyExists(trimmedInput, dictionary) {
  const key = trimmedInput.shift();

  console.log(Object.keys(dictionary).includes(key));
}

function checkIfMemberExists(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const member = trimmedInput.shift();
  const members = dictionary[key];

  if (members) {
    console.log(members.includes(member));
  } else {
    console.log(`ERROR, key of ${key} does not exist in dictionary.`);
  }
}

function clearDictionary(dictionary) {
  for (const member in dictionary) {
    delete dictionary[member];
  }

  console.log(`Cleared dictionary.`)
}

function itemsInDictionary(dictionary) {
  const dictionaryKeys = Object.keys(dictionary);

  if (dictionaryKeys.length) {
    let count = 0;

    dictionaryKeys.forEach((key) => {
      const membersByKey = dictionary[key];

      membersByKey.forEach((member) => {
        count++;
        console.log(`${count}) ${key}: ${member}`);
      })
    });
  } else {
    console.log(`(empty set)`);
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function removeAllMembersFromKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const members = dictionary[key];

  if (members) {
    // ADD sets a new empty array, so we can just delete here
    delete dictionary[key];
    console.log(`Removed`);
    console.log('Dictionary: ' + JSON.stringify(dictionary));
  } else {
    console.log(`ERROR, key of ${key} does not exist in dictionary.`);
  }
}

function removeMemberFromKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const member = trimmedInput.shift();
  const members = dictionary[key];

  if (members) {
    const index = members.indexOf(member);

    if (index > -1) {
      members.splice(index, 1);

      // You would never ever want to do this in a database
      if (members.length === 0) {
        delete dictionary[key];
      }

      console.log(`Removed ${member}`);
      console.log('Dictionary: ' + JSON.stringify(dictionary));
    }
  } else {
    console.log(`ERROR, key of ${key} does not exist in dictionary.`);
  }
}

function returnMembersOfKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const members = dictionary[key];

  if (members) {
    members.forEach((member, index) => {
      console.log(`${index + 1}) ${member}`);
    });
  } else {
    console.log(`ERROR, key of ${key} does not exist in dictionary.`);
  }
}

function detectCommand(input, dictionary) {
  const trimmedInput = input.trim().split(' ');
  const command = trimmedInput.shift();

  switch (command) {
    case 'ADD':
      addMemberToKey(trimmedInput, dictionary);
      break;
    case 'ALLMEMBERS':
      allMembersInDictionary(dictionary);
      break;
    case 'CLEAR':
      clearDictionary(dictionary);
      break;
    case 'ITEMS':
      itemsInDictionary(dictionary);
      break;
    case 'KEYS':
      allKeysInDictionary(dictionary);
      break;
    case 'KEYEXISTS':
      checkIfKeyExists(trimmedInput, dictionary);
      break;
    case 'MEMBERS':
      returnMembersOfKey(trimmedInput, dictionary);
      break;
    case 'MEMBEREXISTS':
      checkIfMemberExists(trimmedInput, dictionary);
      break;
    case 'REMOVE':
      removeMemberFromKey(trimmedInput, dictionary);
      break;
    case 'REMOVEALL':
      removeAllMembersFromKey(trimmedInput, dictionary);
      break;
    default:
      console.log(`Command not recognized.`);
      break;
  }
}

async function run() {
  const dictionary = {};

  while(true) {
    const input = question('>');
    detectCommand(input, dictionary);
  }
}

run().then();