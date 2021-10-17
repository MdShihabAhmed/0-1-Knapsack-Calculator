var num_rows
var knapsackCapacity

function createTable() {
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    var theader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th></tr>';
    var tbody = '';

    for (var i = 0; i < num_rows; i++) {

        tbody += '<tbody><tr>';
        tbody += '<td>';
        tbody += 'Item ' + i
        tbody += '</td>'
        for (var j = 0; j < 2; j++) {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}

var kp01ResultantProfitId = document.getElementById("kp01ResultantProfit")
var kp01ProfitId = document.getElementById("kp01Profit")
var kp01WeightId = document.getElementById("kp01Weight")

var profit = [];
var weight = [];
var i, j = 0;

function generateResult() {

    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    
    profit = [];
    weight = [];

    var resultClass = document.getElementsByClassName("result");

    resultClass[0].style.visibility = "visible";

    var tableId = document.getElementById("table")
    for (var i = 1; i <= num_rows; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }
    knapsack01Algorithm()
}

// applying knapsack 0/1 algorithm
function knapsack01Algorithm() {
var knapsackTable = new Array(num_rows)
    for (i = 0; i <= num_rows; i++) {

        knapsackTable[i] = Array(knapsackCapacity)
        for (j = 0; j <= knapsackCapacity; j++) {
            knapsackTable[i][j] = 0
        }
    }

    var theader = '<table class="table table-bordered">';
    var tbody = '';

    //column name
    //Item
    tbody += '<td>';
    tbody += 'Item';
    tbody += '</td>';
    //Profit
    tbody += '<td>';
    tbody += "Profit";
    tbody += '</td>';
    //Weight
    tbody += '<td>';
    tbody += "Weight";
    tbody += '</td>';
    
    for (j = 0; j <= knapsackCapacity; j++) {
        tbody += '<td>';
        tbody += j;
        tbody += '</td>';
    }
    tbody += '</tr></tbody>\n';

    //filling table
    for (i = 1; i <= num_rows; i++) {
        //item table
        tbody += '<td>';
        tbody += i-1;
        tbody += '</td>';
        //profit table
        tbody += '<td>';
        tbody += profit[i-1];
        tbody += '</td>';
        //weight table
        tbody += '<td>';
        tbody += weight[i-1];
        tbody += '</td>';
        
        for (j = 0; j <= knapsackCapacity; j++) {
            if (weight[i - 1] <= j) {
                knapsackTable[i][j] = (Math.max(knapsackTable[i - 1][j], +knapsackTable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
            else {
                knapsackTable[i][j] = knapsackTable[i - 1][j]
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
        }
        tbody += '</tr></tbody>\n';
    }

    // backtracking to show profit and Items
    i=num_rows;
    j=knapsackCapacity;
    var Vadded = [];
    var Itemadded = [];
    while (i >= 1 && j>=1) {
            if (knapsackTable[i][j] != knapsackTable[i-1][j]) {
                Vadded.push(profit[i-1]);
                Itemadded.push(i-1);
                j-=weight[i-1];
            }
            i--;
    }

    var tfooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = theader + tbody + tfooter;

    console.log(knapsackTable);
    console.log(knapsackTable[num_rows][knapsackCapacity]);

    kp01ResultantProfitId.innerHTML = knapsackTable[num_rows][knapsackCapacity];
    kp01ProfitId.innerHTML = Vadded.reverse(); //profit
    kp01WeightId.innerHTML = Itemadded.reverse(); //Items
}