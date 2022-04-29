const { question } = require('readline-sync');
const chalk = require('chalk');

// Chalk classes
const error = chalk.bold.red;
const info = chalk.bold.cyan;
const success = chalk.bold.green;

function allKeysInDictionary(dictionary) {
  const dictionaryKeys = Object.keys(dictionary);

  if (dictionaryKeys.length) {
    console.log(info('All keys in dictionary: '));

    dictionaryKeys.forEach((key, index) => {
      console.log(`${index + 1}) ${key}`);
    });
  } else {
    console.log(info('(empty set)'));
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function addMemberToKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const value = trimmedInput.shift();

  if (!key) {
    console.log(error('ERROR: '));
    console.log('You did not supply a key to add a member to.');
    return;
  } else {
    if (!value) {
      console.log(error('ERROR: '));
      console.log(`You did not supply a member to add to the key of ${info(key)}`);
      return;
    }

    if (Object.keys(dictionary).includes(key)) {
      if (dictionary[key] && dictionary[key].includes(value)) {
        console.log(error('ERROR:'))
        console.log(`Member ${info(value)} already exists for ${info(key)}`);
      } else {
        dictionary[key].push(value);
        addedMessage();
      }
    } else {
      dictionary[key] = [];
      dictionary[key].push(value);
      addedMessage();
    }
  }

  function addedMessage() {
    console.log(success('Added'));
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
    console.log(info('(empty set)'));
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function checkIfKeyExists(trimmedInput, dictionary) {
  const key = trimmedInput.shift();

  if (key) {
    console.log(Object.keys(dictionary).includes(key));
  } else {
    console.log(error('ERROR: '));
    console.log(`You did not supply a key to check if it exists.`);
  }
}

function checkIfMemberExists(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const member = trimmedInput.shift();
  const members = dictionary[key];

  if (key) {
    if (!member) {
      console.log(error('ERROR: '));
      console.log(`You did not supply the member to check if it exists in ${info(key)}.`);
      return;
    }

    if (members) {
      console.log(members.includes(member));
    } else {
      console.log(error('ERROR: '));
      console.log(`Key of ${info(key)} does not exist in dictionary.`);
    }
  } else {
    console.log(error('ERROR:'));
    console.log('You did not supply a key for the member.');
  }

}

function clearDictionary(dictionary) {
  for (const member in dictionary) {
    delete dictionary[member];
  }

  console.log(success(`Cleared dictionary.`));
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
    console.log(info('(empty set)'));
    console.log(`Dictionary: ${JSON.stringify(dictionary)}`);
  }
}

function removeAllMembersFromKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const members = dictionary[key];

  if (key) {
    if (members) {
      // ADD sets a new empty array, so we can just delete here
      delete dictionary[key];
      console.log(success('Removed all members from ' + key));
      console.log('Dictionary: ' + JSON.stringify(dictionary));
    } else {
      console.log(`ERROR, key of ${info(key)} does not exist in dictionary.`);
    }
  } else {
    console.log(error('ERROR: '));
    console.log('You did not supply a key to remove members from.');
  }

}

function removeMemberFromKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const member = trimmedInput.shift();
  const members = dictionary[key];

  if (key) {
    if (!member) {
      console.log(error('ERROR: '));
      console.log(`You did not supply the member to check if it exists in ${info(key)}.`);
      return;
    }

    if (members) {
      const index = members.indexOf(member);
  
      if (index > -1) {
        members.splice(index, 1);
  
        // You would never ever want to do this in a database
        if (members.length === 0) {
          delete dictionary[key];
        }
  
        console.log(success(`Removed ${member}`));
        console.log('Dictionary: ' + JSON.stringify(dictionary));
      } else {
        console.log(error('ERROR: '));
        console.log(`${info(member)} does not exist in ${info(key)}`);
      }
    } else {
      console.log(error('ERROR: '));
      console.log(`Key of ${info(key)} does not exist in dictionary.`);
    }
  } else {
    console.log(error('ERROR: '));
    console.log('You did not supply a key to remove a member from.');
  }

}

function returnMembersOfKey(trimmedInput, dictionary) {
  const key = trimmedInput.shift();
  const members = dictionary[key];

  if (key) {
    if (members) {
      members.forEach((member, index) => {
        console.log(`${index + 1}) ${member}`);
      });
    } else {
      console.log(error('ERROR: '));
      console.log(`Key of ${info(key)} does not exist in dictionary.`);
    }
  } else {
    console.log(error('ERROR: '));
    console.log('You did not supply a key to get members from.');
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
      console.log(error('ERROR: '));
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