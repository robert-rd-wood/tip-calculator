// Career Services Coding Challenge - Tip Calculator

// The Challenge

// Your task is to create a simple command-line (Node, Python or other) or front-end JavaScript application that will help calculate a tip at a restaurant for your server. No boilerplate code
// will be provided, so you are free to construct this however you would like. However, your application must:
    // * Take in the value of the bill
    // * Take in the desired tip percentage
    // * Include the option to split the tip amount by number of people at the table
    // * The application should then calculate the amount of tip per table (or per person if the split option is chosen) and return that value to the user.

// BONUS:
    // * Create a simple UI so that this can be used in a browser
    // * Deploy to your favorite hosting service (Heroku, Netlify, etc.)


// The Process 
// Career Services will evaluate the submissions and come to a consensus on a winner. You will be evaluated upon completion of the requirements of the challenge, code cleanliness, and formatting. Career Services will evaluate the entries and pick a winning submission and will announce on July 12, 2019. 
// Restraints and Guidelines...
// Please read these thoroughly. We will validate your submission based on the following criteria:
    // * Your code should be clean and readable. Don't neglect the comments!
    // * You must push your code in a git repository and submit git repository URL to the challenge email.
    // * Commit early, commit often; we will look at the progression of your code throughout application development. Consider your commits valuable. 
    // * You shouldn't need any external libraries to complete this application... BUT if you do, you need to document it in your readme and let us know why it was a better choice.

// Some additional requirements for your application:
    // * The bill value must be a positive float but your application must handle user input that might be a negative or 0 dollar amount (i.e. error handling).
    // * The user input percentage for the tip must be a positive float.
    // * The returned value must be a float rounded to two decimal points (i.e. accurate dollars and cents).

// Function to calculate results based on input fields
function handleCalculate(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Grab values from input fields
    var billAmt = d3.select("#bill-amt").property("value");
    var tipPct = d3.select("#tip-pct").property("value");
    var splitNum = d3.select("#split-num").property("value");

    billAmt = +billAmt;
    tipPct = +tipPct;
    splitNum = +splitNum;

    // Add error checking here

    // Calculate tip
    var tipAmt = billAmt * (tipPct / 100)
    // Calculate total bill including tip
    var totalBill = billAmt + tipAmt;
    // Calculate split amount
    var splitAmt = totalBill / splitNum;
    // Create array of split amounts
    var splitAmts = [];
    var i;
    for(i=0; i<splitNum; i++) {
        splitAmts.push(splitAmt);
    }

    console.log(`Bill is ${billAmt}`);
    console.log(`Tip % is ${tipPct}`);
    console.log(`Split ${splitNum} ways`);
    console.log("------------------------");
    console.log(`Tip amount is ${tipAmt}`);
    console.log(`Total bill with tip is ${totalBill}`);
    console.log(`Split amount is ${splitAmt} per person`);
    console.log(`Array of split amounts: ${splitAmts}`);
    console.log("------------------------");
    


    // Build pie chart with array of split amounts
    buildPie(splitAmts);
}

function handleClear(event) {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear input fields
    document.getElementById('bill-amt').value = '';
    document.getElementById('tip-pct').value = '';
    document.getElementById('split-num').value = '';

    // Delete current chart
    d3.select("#table-pie").remove();
}


// Function to build pie chart with the split amounts
function buildPie(splitAmts) {

    // Create trace element using passed array
    trace = {
        type: 'pie',
        values: splitAmts,
        labels: []
    };
    
    // Create layout element
    var layout = {
        margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 50
        }
    }
    
    // Assign data variable for plotting
    var data = [trace];
    
    // Draw pie chart
    Plotly.newPlot("table-pie",data,layout);
}

// Function to create array and populate Split select dropdown
function populateSplit() {
    // Create array for Split select dropdown
    var splitNums = [];
    var i;
    // Create array from 1 to 10 (increase '10' below to extend select dropdown)
    for(i=1; i<=10; i++) {
        splitNums.push(i);
    }

    // Select html element
    var splitNum = d3.select("#split-num");

    // Populate Split select dropdown
    splitNums.forEach(function(number) {
        var option = splitNum.append("option");
        option.text(number);
    });
}

// Declare variable for Filter Table button
var calculateButton = d3.select("#calculate-btn");

// Declare variable for Clear Filter button
var clearButton = d3.select("#clear-btn");

// Define Filter Table button action
calculateButton.on("click",handleCalculate);

// Define Clear Filter button action
clearButton.on("click",handleClear);

// Populate Split select dropdown on page load
populateSplit();