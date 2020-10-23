/*eslint-env browser*/
var $ = function(id) {
    "use strict";
    return window.document.getElementById(id);
};

var labels = ["Name", "Title", "Extension"];
var employees = [
    ["Sally Smith", "Quality Assurance", 3423],
    ["Mark Martin", "VP Sales", 3346],
    ["John Johnson", "Marketing", 3232],
    ["Alex Thunder", "Owner", 4568],
    ["Ben Simmons", "CEO ", 5643],
];

window.onload = function(){
    //title
    document.title = "The Employee Managemment Application";
    //heading
    var heading = document.createElement("h2");
    heading.innerHTML = "The Employee Management Application";
    document.body.appendChild(heading);
    //paragraph
    var addparagraph = document.createElement("p");
    addparagraph.innerHTML = "Add Employee";
    addparagraph.style.fontWeight="bold";
    document.body.appendChild(addparagraph);
    //form
    var box = document.createElement("div");
    box.style.width="500px";
    box.style.height="200px";
    box.style.display="flex";
    box.style.flexDirection="row";
    document.body.appendChild(box);
    
    var form = document.createElement("div");
    form.style.width = "300px";
    // 3 inputs
    for (i = 0; i<labels.length; i++) {
        var inputs = document.createElement("div");
        inputs.style.clear = "both";
        var textLabel = document.createElement("label");
        textLabel.innerHTML = labels[i] + ":";
        var input = document.createElement("input");
        input.type = "text";
        input.id = "label"+[i];
        input.style.height = "20px";
        input.style.marginBottom = "20px";
        input.style.float = "right";
        input.style.border = "1px solid blue";
  
        inputs.appendChild(textLabel);
        inputs.appendChild(input);
        form.appendChild(inputs);
    }
    box.appendChild(form);
    // add button
    var div = document.createElement("div");
    div.style.clear = "right";
    div.style.height = "40px";
    
    var addButton = document.createElement("button");
    addButton.innerHTML = "Add";
    addButton.style.background = "#408dc7";
    addButton.style.color = "white";
    addButton.style.border ="solid #blue";
    addButton.style.padding = "5px 30px";
    addButton.style.float= "right";

    addButton.addEventListener("click", addEmployee);
    div.appendChild(addButton);
    form.appendChild(div);

    // handling error message
    var errorDiv = document.createElement("div");
    errorDiv.id = "errorDiv";
    errorDiv.style.width="250px";
    document.body.appendChild(errorDiv);
    for (var i = 0; i<labels.length; i++) {
        var error = document.createElement("p");
        error.id = labels[i]+"Error";
        error.style.color = "red";
        error.style.margin="2px 10px 23px 10px";
        $("errorDiv").appendChild(error);
    }
    box.appendChild(errorDiv);
    // display how many employee
    var text = document.createElement("p");
    text.innerHTML = "Showing " +employees.length + " Employees";
    text.style.font = "bold 15px sans-serif";
    document.body.appendChild(text);
    
    // display the table
    // table div
    var tablediv=document.createElement("div");
    tablediv.style.width = "1000px";
    document.body.appendChild(tablediv);
    // table
    var table = document.createElement("table");
    table.id = "employeeTable";
    table.style.width = "800px";
    table.style.height = "30px";
    table.style.background = "#408dc7";
    table.style.border = "2px solid white";
    table.style.borderCollapse = "collapse";

    //head row
    var headRow = document.createElement("tr");
    headRow.style.color = "white";
    headRow.style.font = "14px sans-serif";
    headRow.style.border = "2px solid white";
    for (i = 0; i<labels.length; i++) {
        var column = document.createElement("th");
        column.style.width = "25%";
        column.innerHTML = labels[i];
        column.style.font = "sans-serif";
        column.style.textAlign = "left";
        column.style.paddingLeft= "5px";
        column.style.border = "1px solid white";
        headRow.appendChild(column);
    }

    var deleleteColumn = document.createElement("th");
    deleleteColumn.style.width = "25%";
    deleleteColumn.style.border = "1px solid white";
    deleleteColumn.innerHTML="Operation";

    headRow.appendChild(deleleteColumn);
    table.appendChild(headRow);
    tablediv.appendChild(table);

    // show data in the table
    displayData();

    //delete function
    document.body.addEventListener('click', function (event) {
        window.console.log(event.id);
        for (var i = 0; i< employees.length; i++) {
            if(event.target.id == employees[i][2]+" btn" ) {
                deleteEmployee(i, employees[i][2]);
          }
        }
    });

}

function displayData(){
    for(i = 0; i < employees.length; i++){
        var table = $("employeeTable");
        var row = document.createElement("tr");
        row.id = employees[i][2] + " row";
        for (j = 0; j < employees[i].length; j++) {
            var td = document.createElement("td");
            td.innerHTML = employees[i][j];
            td.style.border = "1px solid white";
            td.style.font = "14px sans-serif";
            td.style.paddingLeft="5px";
            row.appendChild(td);
        }
        var td = document.createElement("td");
        td.style.border = "1px solid white";
        td.style.display="flex";
        td.style.justifyContent="center";
        row.appendChild(td);
        //delete button
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.style.color = "white";
        button.style.background = "#408dc7";
        button.style.padding = "1px 20px";
        button.style.margin = "5px 0";
        button.id = employees[i][2]+" btn";
        row.lastChild.appendChild(button);
        //change the color
        if (i%2 === 0) {
            row.style.background = "#D2DEEE";
        } else {
            row.style.background = "#EAEFF5";
        }
        table.appendChild(row);
    }  
}

function addEmployee(){
    var name = $("label0");
    var title = $("label1");
    var extension = $("label2"); 
    flag = true;
    for (i = 0; i<labels.length; i++) {
        var input = $("label" +[i]).value;
        if (input=="") {
          $(labels[i]+"Error").innerHTML = "Please enter " + labels[i];
          flag = false;
        } else {  
          $(labels[i]+"Error").innerHTML = "";
        }
    }
    if(flag){
        var newEmployee = [name.value, title.value, extension.value];
        var newArray = employees.push(newEmployee);
        addRow(newArray - 1);
        name.value = "";
        title.value = "";
        extension.value = "";
    }
}
function addRow(i){
    var table = $("employeeTable");
    var row = document.createElement("tr");
    row.id = employees[i][2] + " row";
    for (j = 0; j < employees[i].length; j++) {
        var td = document.createElement("td");
        td.innerHTML = employees[i][j];
        td.style.border = "1px solid white";
        td.style.font = "14px sans-serif";
        td.style.paddingLeft="5px";
        row.appendChild(td);
    }
    var td = document.createElement("td");
    td.style.border = "1px solid white";
    td.style.display="flex";
    td.style.justifyContent="center";
    row.appendChild(td);
    //delete button
    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.style.color = "white";
    button.style.background = "#408dc7";
    button.style.padding = "1px 20px";
    button.style.margin = "5px 0";
    button.id = employees[i][2]+" btn";
    window.console.log(button.id);
    row.lastChild.appendChild(button);
    //change the color
    if (i%2 === 0) {
        row.style.background = "#D2DEEE";
    } else {
        row.style.background = "#EAEFF5";
    }
    table.appendChild(row);
}

function deleteEmployee(i,j){
    employees.splice(i, 1);
    var row = $(j + " row");
    row.remove();
}