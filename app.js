/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";

function app(people) {
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":

            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            let personFamily = displayFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = displayPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()
//Find person by one trait
function searchByTraits(people) {
    let traitGroup = [];
    let traitSearch = prompt('What trait would you like to filter people by?  You can select "ID Number", "Gender", "Date of Birth", "Height", "Weight", "Eye Color" "Occupation", "Parents", or "Spouse".  You can also search for multiple traits at a time by typing "multiple".')
    switch (traitSearch.toLowerCase()) {
        case "id":
        case "id number":
        case "id #":
            traitGroup = searchByID(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "name":
        case "first name":
        case "first":
            traitGroup = searchByFirstName(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "last name":
        case "family name":
        case "surname":
            traitGroup = searchByLastName(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "gender":
        case "sex":
            traitGroup = searchByGender(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "date of birth":
        case "dob":
            traitGroup = searchByBirthdate(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "height":
            traitGroup = searchByHeight(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "weight":
        case "lbs":
            traitGroup = searchByWeight(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "eye color":
        case "eyes":
            traitGroup = searchByEyes(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "occupation":
        case "job":
        case "profession":
            traitGroup = searchByJob(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "parents":
            traitGroup = searchByParents(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "spouse":
        case "married":
            traitGroup = searchBySpouse(people);
            narrowDownTraitGroup(traitGroup);
            break;
        case "multiple":
            searchByMultipleTraits(people);
            break;
    }
}
//Multiple trait search function-
function searchByMultipleTraits(people) {
    let numberOfTraits;
    let peopleTraits = [];
    let filteredPeople = [];
    numberOfTraits = pickNumberOfTraits(numberOfTraits);
    multipleTraitInput(peopleTraits, numberOfTraits);
    while (peopleTraits.length > 0) {
        filteredPeople = filterTraits(peopleTraits, people);
        if (filteredPeople.length === 1) {
            alert('Search has found one person.');
            let person = filteredPeople;
            mainMenu(person, people);
            return;
        }
        else if (filteredPeople.length == 0){
            alert('No person(s) found. Try again.')
            app(people);
            return;
        }

    }
}

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */


/**Search Functions
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

// Search by ID 
function searchByID(people) {
    let userInput = promptFor("Search by 9 digit ID number, enter the numerical ID below.", idNumber)
    if (userInput.toLowerCase() === "exit") {
        return;
    }
    let peopleByID = [];
    peopleByID = people.filter(function (people) {
        if (people.id == userInput) {
            return peopleByID;
        }
    })
    let traitGroup = peopleByID;
    displayPeople(traitGroup);
    return traitGroup;
}

// Search by first OR last name:
function searchByFirstName(people) {
    let userInput = promptFor("Please enter person's First Name. *Name must stat with capital letter*", autoValid)
    if (userInput.toLowerCase() === "exit") {
        return;
    }
    let peopleByFirstName = [];
    peopleByFirstName = people.filter(function (people) {
        if (people.firstName == userInput) {
            return peopleByFirstName;
        }
    })
    let traitGroup = peopleByFirstName;
    displayPeople(traitGroup);
    return traitGroup;
}
function searchByLastName(people) {
    let userInput = promptFor("Please enter person'd Last Name. *Name must start with capital letter*", autoValid)
    if (userInput.toLowerCase() === "exit") {
        return;
    }
    let peopleByLastName = [];
    peopleByLastName = people.filter(function (people) {
        if (people.lastName == userInput) {
            return peopleByLastName;
        }
    })
    let traitGroup = peopleByLastName;
    displayPeople(traitGroup);
    return traitGroup;
}
// Search by either gender
function searchByGender(people) {
    let userInput = promptFor("Enter a gender.", maleFemale);
    if (userInput.toLowerCase === "exit") {
        return;
    }
    if (userInput.toLowerCase() === "male") {
        let men = [];
        men = people.filter(function (people) {
            if (people.gender === userInput) {
                return men;
            }
        })
        let traitGroup = men;
        return traitGroup;
    }
    else if (userInput.toLowerCase() === "female") {
        let women = [];
        women = people.filter(function (people) {
            if (people.gender === userInput) {
                return women;
            }
        })
        let traitGroup = women;
        displayPeople(traitGroup);
        return (traitGroup);
    }
}


/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height:${person.height} + "Inches"\n`;
    personInfo += `Weight: ${person.wight}+"lbs" + "\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    alert(personInfo);
}

function displayFamily(person) {
    let personFamily = `Parents: ${person.parents}\n`;
    personFamily += `Current Spouse: ${person.currentSpouse}\n`;
    alert(personFamily);
}

function displayPersonDescendants(person) {
    let personDescendants = `Decendents: `
}
// End of displayPerson()


//data validation functions-
function idNumber(input) {
    if (input.length === 9 || input.toLowerCase() == 'exit') {
        return true;
    }
    else {
        return false;
    }
}

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
