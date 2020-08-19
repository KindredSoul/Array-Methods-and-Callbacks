import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
const year = fifaData.filter((item)=>{
    return item["Year"] === 2014 && item["Stage"] === "Final"
})
console.log(`${year[0]["Home Team Name"]} scored ${year[0]["Home Team Goals"]} goals in 2014`)
console.log(`${year[0]["Away Team Name"]} scored ${year[0]["Away Team Goals"]} goals in 2014`)
console.log(year[0]["Win conditions"])
/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    let finalsData = data.filter((item)=>{
        return item["Stage"].includes("finals")
    })
    return finalsData
};
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(func, data) {
    let years = func(data).map((item)=>{
        return item["Year"]
    })
    return years
};

console.log(getYears(getFinals, fifaData));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(func, data) {

    let winners = func(data).map((teamNames)=>{
            if(teamNames["Home Team Goals"] > teamNames["Away Team Goals"] || teamNames["Win conditions"].includes(teamNames["Home Team Name"])){
                return teamNames["Home Team Name"]
            }else if(teamNames["Away Team Goals"] < teamNames["Home Team Goals"] || teamNames["Win conditions"].includes(teamNames["Away Team Name"])){
                return teamNames["Away Team Name"]
            }else{
                return "No team"
            }
    })
    
    return winners
};
console.log(getWinners(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */
// General idea is to compare array indexes and create a new array with matched indexes
function getWinnersByYear(years, winners) {
    // PLacing the outputs of the functions into variables easily work with them
    let winningYears = years(getFinals, fifaData)
    let winningCountries = winners(getFinals, fifaData)

    // Trying to compare indexes to combine into a single array 
    let winsByYearCountry = winningYears.map((item, i) => {
        return (`In ${winningYears[i]}, ${winningCountries[i]} won the world cup!`)
    });
    // It works but I'm not sure if it's working for the reasons I wanted it to
    console.log(winsByYearCountry)
    return winsByYearCountry
};

getWinnersByYear(getYears, getWinners);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
