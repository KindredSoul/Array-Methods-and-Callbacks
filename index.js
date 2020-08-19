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
    // Using .filter and .includes returns an array containing only objects that contain the word "finals"
    let finalsData = data.filter((item)=>{
        return item["Stage"].includes("finals")
    })
    return finalsData
};
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(func, data) {
    // Using .map returns and array with only the years available
    let years = func(data).map((item)=>{
        return item["Year"]
    })
    return years
};

console.log(getYears(getFinals, fifaData));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(func, data) {

    let winners = func(data).map((teamNames)=>{
        // This statement checks for home team victories through either a score or other win con and adds them to the array 
            if(teamNames["Home Team Goals"] > teamNames["Away Team Goals"] || teamNames["Win conditions"].includes(teamNames["Home Team Name"])){
                return teamNames["Home Team Name"]
        // This statement checks for away team victories through either a score or other win con and adds them to the array 
            }else if(teamNames["Away Team Goals"] < teamNames["Home Team Goals"] || teamNames["Win conditions"].includes(teamNames["Away Team Name"])){
                return teamNames["Away Team Name"]
        // If a tie occurs and there is no win condition mentioned in the data, then it will be labeled as "No team" wins
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
// Placing the outputs of the functions into variables easily work with them
    let winningYears = years(getFinals, fifaData)
    let winningCountries = winners(getFinals, fifaData)

// Trying to compare indexes to combine into a single array 
    let winsByYearCountry = winningYears.map((item, i) => {
        return (`In ${winningYears[i]}, ${winningCountries[i]} won the world cup!`)
    });
// It works but I'm not sure if it's working for the reasons I wanted it to
    return winsByYearCountry
};

console.log(getWinnersByYear(getYears, getWinners));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let goals = data
    .map(goal => {
        return {away: goal["Away Team Goals"], home: goal["Home Team Goals"]}
    })
    .reduce((acc, goal, i, goals)=>{
        if(i < goals.length-1){
            // return {home: acc.home + goal.home, away: acc.away + goal.away}
            acc.away+=goal.away
            acc.home+=goal.home
            return acc
        }else if(i === goals.length-1){
            console
            acc.away/=i
            acc.home/=i
            console.log(acc)
            return acc
        }
    }, {home: 0, away: 0})


    console.log(`Average of away goals: ${goals.away}`)
    console.log(`Average of home goals: ${goals.home}`);;
    return [goals]
};

getAverageGoals(fifaData);

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    let countryWins = data.filter((item)=>{
    // Sorting through each item in the data array and creating a new array with items only if teamInitials matched the team's initials AND if the team won that game, regardless if they were the home team or away team
        return teamInitials === item["Away Team Initials"] && item["Away Team Goals"] > item["Home Team Goals"] || teamInitials === item["Home Team Initials"] && item["Home Team Goals"] > item["Away Team Goals"]
    })
    // The length of the new filtered array is equal to that team's number of wins
    console.log(countryWins.length);
    return countryWins.length
};

getCountryWins(fifaData, "BRA");


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    // First get an array of all the teams that won with a score greater than zero
    let goals = data.filter(goalData=>{
        return goalData["Away Team Goals"] > 0 && goalData["Away Team Goals"] > goalData["Home Team Goals"] || goalData["Home Team Goals"] > 0 && goalData["Home Team Goals"] > goalData["Away Team Goals"]
    })
    // Count the number of times each wining team appears and return the team's name, number of appearances and total number of goals

    // Return ONE team with the highest average number of goals scored
    
    console.log(goals)
};

getGoals(fifaData);


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
