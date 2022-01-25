/* JavaScript for demostration purposes
   Requires that the table be predefined on the HTML 
   Format: <table> -> <thead> | <tbody> -> <tr> -> <th> | <td> */

var listOfCohorts = ['Alpha', 'Bravo', 'Charlie', 'Delta']; 

window.onload = function () {
    displayOptions();
    sortDemo();
}

/**
 * Generates the checkbox options and search button based
 * on the list of cohorts above.
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
        checkbox.name = listOfCohorts[i][0];
        checkbox.value = listOfCohorts[i];

        // label attributes
        let label = document.createElement("label");
        label.for = listOfCohorts[i][0];
        label.innerHTML = listOfCohorts[i];
        label.style.marginRight = "10px";
        options.append(checkbox);
        options.append(label);
    }

    // creates the search button
    let button = document.createElement("button");
    button.addEventListener("click", displayDemo)
    button.style.marginLeft = "10px";
    button.innerHTML = "search";
    options.append(button);
}

/** 
 *  Displays the demo-version of the main content.
 */
 function displayDemo() {
    let cb = document.getElementsByClassName("cohort-checkbox");
    let cohorts = document.getElementsByClassName("cohort");

    // filters based on the selected options on the checkbox
    for (let i = 0; i < cohorts.length; i++) {
        if (cb[i].checked) {
            cohorts[i].style.display = "block";
        } else {
            cohorts[i].style.display = "none";
        }
    }
}

/**
 * Creates the sorting arrow display and event listener for sorting
 */
function sortDemo() {
    let th = document.getElementsByTagName("th");
    
    // creates an outer and inner div for the text and arrows, respectively
    // requires that the table is in the correct format
    for (let i = 0; i < th.length; i++) {
        let outer = document.createElement("div");          // text
        let inner = document.createElement("div");          // arrows

        outer.classList.add("arrow");
        if (i == 0) {
            inner.classList.add("up-arrow");              // first column will be ascending
        } else {
            inner.classList.add("none");
        }

        outer.innerHTML = th[i].innerHTML;                  // copies the text
        th[i].innerHTML="";                                 // removes redundant text for the demo
        inner.style.display = "inline-block";
        inner.style.marginLeft = "10px";

        outer.addEventListener("click", sortDemoHelper);    // sorting algorithm
        outer.append(inner);
        th[i].appendChild(outer);
    }
}

/**
 * Updates to the appropriate arrow when clicked and performs 
 * the appropriate sorting option.
 */
function sortDemoHelper() {
    let col = event.target.firstChild.data;             // column name
    let inner = event.target.firstChild.nextSibling;
    let state = inner.classList[0];                     // column state [none, desc, asc]

    // clears all arrows so that only one arrow is displayed at a time
    arrows = document.getElementsByClassName("arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].firstChild.nextSibling.classList.replace("up-arrow", "none");
        arrows[i].firstChild.nextSibling.classList.replace("down-arrow", "none");
    }

    // updates the appropriate sorting arrow for the event
    switch(state) {
        case "none":
            inner.classList.replace("none", "up-arrow");
            sortDemoHelperHelper(false, col);
            break;
        case "down-arrow":
            inner.classList.replace("none", "up-arrow");
            sortDemoHelperHelper(false, col);
            break;
        case "up-arrow":
            inner.classList.replace("none", "down-arrow");
            sortDemoHelperHelper(true, col);
            break;
    }
}

/**
 * Performs insertion sort for the selected column
 * 
 * @param {Bool}   order 
 * @param {string} col
 */
function sortDemoHelperHelper(order, col) {
    let table = document.getElementById("main-table");
    let thead = table.children[0].children[0].children;    // table > thead > tr > [th1, th2, ...]
    let colNo = 0;

    // searches for which column to sort
    for (let i = 0; i < thead.length; i++) {
        let text = thead[i].firstChild.firstChild.data     // outer div value (column name)
        if (text == col) {
            colNo = i;                                     // finds the matching column number
        }
    }

    let tbody = table.children[1];                          // table > tbody
    let tr = tbody.children                                 // tbody > [tr1, tr2, ...]

    for (let i = 0; i < tr.length; i++) {
        let index = i;                                      // swap index
        let val = tr[i].children[colNo].innerHTML;

        for (let j = i; j < tr.length; j++) {
            let curr = tr[j].children[colNo].innerHTML;
            if (order && curr > val) {                      // descending
                val = curr;
                index = j;
            } else if (!order && val > curr) {              // ascending
                val = curr;
                index = j;
            }
        }
        if (i != index) {
            swap(tr, i, index);
        }
    }
}

/**
 * Helper function that swaps the HTML elements within an array
 * 
 * @param {DOM array} data 
 * @param {int} indexA 
 * @param {int} indexB 
 */
function swap(data, indexA, indexB) {
    let temp = data[indexA].innerHTML;
    data[indexA].innerHTML = data[indexB].innerHTML;
    data[indexB].innerHTML = temp;
}