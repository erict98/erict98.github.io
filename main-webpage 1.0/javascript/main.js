/* This JavaScript will handle the generation of the main table
   and its associated functions */
import { Database } from "./dbcon";

var db = new Database();

var listOfCohorts = ['Alpha',                   // list of cohorts to be updated periodically
    'Bravo', 'Charlie', 'Delta']; 

window.onload = function () {
    displayOptions();
}

/**
 * Generates the checkbox options and search button based
 * on the list of cohorts above. The list should be updated when the
 * database has been updated with additional cohorts.
 */
function displayOptions() {
    let options = document.getElementById("cohort-options");

    // creates checkbox and label for each option
    for (let i = 0; i < listOfCohorts.length; i++) {
        // checkbox attributes
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.classList.add("cohort-checkbox");
        checkbox.name  = listOfCohorts[i][0];
        checkbox.value = listOfCohorts[i];

        // label attributes
        let label = document.createElement("label");
        label.for = listOfCohorts[i][0];
        label.innerHTML = listOfCohorts[i];
        label.style.marginRight = "10px";

        // update DOM element
        options.append(checkbox);
        options.append(label);
    }

    // creates the search button with functionality
    let button = document.createElement("button");
    button.innerHTML = "search";
    button.style.marginLeft = "10px";
    button.addEventListener("click", generateTable);

    options.append(button);
}

/**
 * Generates the table based on the selected options by performing a SQL query.
 */ 
function generateTable() {
    // clears the current table
    let table = document.getElementById("main-table");
    table.innerHTML = "";

    // sends the parameters
    let options = document.getElementsByClassName("cohort-checkbox");
    var params = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            params.append(options[i].value);
        }
    }
    let data = db.createTable(params);  

    // creates the columns
    let header = Objects.keys(data);
    table.append(createHeader(header));

    // creates the rows
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        tbody = document.append(createRow(row));
    }
    table.append(tbody);
}

/**
 * Generates the column headers based on the given list 
 * and provides functionality.
 * 
 * @param   {String array} col
 * @returns {DOM}          tr
 */
function createHeader(col) {
    let thead = documnet.createElement("thead");
    let tr = document.createElement("tr");

    for (let i = 0; i < col.length; i++) {
        let value = col[i];                             // column name
        let th = document.createElement("th");          // column DOM element
        let outer = document.createElement("div");      // outer DOM contains the text
        let inner = document.createElement("div");      // inner DOM provides sorting functionality

        // the cohort will be sorted by default
        outer.classList.add("arrow");
        if (value == "Cohort") {
            inner.classList.add("up-arrow");
        } else {
            inner.classList.add("none");
        }
        
        // adds CSS and functionality to the column
        outer.innerHTML = value;
        inner.style.display = "inline-block";
        inner.style.marginLeft = "10px";
        outer.addEventListener("click", sortTable);
        outer.append(inner);

        th.appendChild(outer);
        tr.appendChild(th);
    }
    thead.append(tr);
    return thead;
}

/**
 * Generates a new row based on the given object.
 * 
 * @param   {object} row 
 * @returns {DOM}    tr
 */
function createRow(row) {
    let tr = document.createElement("tr");
    // row = { col1: value, col2: value, ...}
    for (let col in row) {
        let td = document.createElement("td");
        td.appendChild(row[col]);
        tr.appendChild(td);
    }
    return tr;
}

/**
 * Sorts the table based on the selected column by performing a SQL query.
 */ 
function sortTable() {
    let inner = event.target.firstChild.nextSibling;
    let value = event.target.firstChild.data;           // column name
    let state = inner.classList[0];                     // column state [none, desc, asc]

    // clears all arrows so that only one arrow is displayed at a time
    arrows = document.getElementsByClassName("arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].firstChild.nextSibling.classList.replace("down-arrow", "none");
        arrows[i].firstChild.nextSibling.classList.replace("up-arrow", "none");
    }

    // updates the sorting arrows and begins building parameters
    let params = [];
    params.append(value);
    switch(state) {
        case "none":
            inner.classList.replace("none", "up-arrow");
            params[0] = params[0] + " ASC";
            break;
        case "down-arrow":
            inner.classList.replace("none", "up-arrow");
            params[0] = params[0] + " ASC";
            break;
        case "up-arrow":
            inner.classList.replace("none", "down-arrow");
            params[0] = params[0] + " DESC";
            break;
    }
    
    // additional sorting parameters
    if (value == "First Name") {
        params.append["Last Name ASC"];
    } else if (value == "Last Name") {
        params.append["First Name ASC"];
    } else {
        params.append["First Name ASC"];
        params.append["Last Name ASC"];
    }

    // sends the parameters and updates the table
    let data = db.updateTable(params);
    let table = document.getElementById("main-table");
    let tbody = table.children[1];
    tbody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        tbody = document.append(createRow(row));
    }
}