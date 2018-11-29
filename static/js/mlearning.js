import * as per from './perceptron.js';
import {circle_result, square} from './feature_trans.js'
//button
$("#train").click(function(){
    train();
});
$("#number_button").click(function(){
    generate(3,drawPer,per.result,$("#number").val());
});
$("#nav-optimization-tab").click(function(){
    generate(3,drawPer,per.result,$("#number").val());
});
$("#circle_number_button").click(function(){
    generate(1,drawFea,circle_result,$("#circle_number").val());
    $("#div_circle").hide();
    $("#div_train_finish").hide();
});
$("#nav-generalization-tab").click(function(){
    generate(1,drawFea,circle_result,$("#circle_number").val());
    $("#div_circle").hide();
    $("#div_train_finish").hide();
});
$("#show_circle").click(function(){
    $("#div_circle").show();
    x_feature = feature_trans(a,b,bias,x_per);
});
$("#circle_train").click(function(){
    train_feature();
});
$("#circle_after_train").click(function(){
  $("#div_train_finish").show();
  finish_train(w);
});
//feature transformation variable
var x_feature = []
function drawFea(a,b,c,x_per,y,maxX1){
  /*var trace1 = {
    x: [1.5],
    y: [0.75],
    text: ['Unfilled Circle'],
    mode: 'text'
  };*/

  var layout = {
    title: 'Data',
    xaxis: {
      range: [-1.5, 1.5],
      title: 'x1 Axis'
    },
    yaxis: {
      range: [-1.5, 1.5],
      title: 'x2 Axis'
    },
    width: 400,
    height: 400,
    shapes: [
      // Unfilled Circle
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -c/a,
        y0: -c/b,
        x1: c/a,
        y1: c/b,
        line: {
          color: 'rgba(148, 50, 96, 200)'
        }
      },
      /* Filled Circle
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        fillcolor: 'rgba(50, 171, 96, 0.7)',
        x0: 3,
        y0: 3,
        x1: 4,
        y1: 4,
        line: {
          color: 'rgba(50, 171, 96, 1)'
        }
      }*/
    ]
  };
  var trace2 = {
    x: getCol(x_per,0,y,function(a, b) { return a > b; }),
    y: getCol(x_per,1,y,function(a, b) { return a > b; }),
    name: 'not Cat',
    mode: 'markers',
    type: 'scatter'
  };
  var trace3 = {
    x: getCol(x_per,0,y,function(a, b) { return a < b; }),
    y: getCol(x_per,1,y,function(a, b) { return a < b; }),
    name: 'is Cat',
    mode: 'markers',
    type: 'scatter'
  };

  var data = [trace2,trace3];

  Plotly.newPlot('feature_graph', data, layout);
}
function getCol(matrix, col,y,compare){
   var column = [];
   for(var i=0; i<matrix.length; i++){
     if(compare(y[i],0) ){
       column.push(matrix[i][col]);
     }
   }
   return column;
}
function feature_trans(a,b,c,x){
  w = [0,0,0]
  var x_feature = []
  for(var i = 0;i < x.length;i++){
    x_feature[i] = []
    for (var j = 0; j < x[i].length; j++){
      x_feature[i][j] = square(x[i][j]);
    }
  }
  var traceW = {
    x: [0,1],
    y: [0,0],
    name: 'weight',
    mode: 'lines'

  };
  var trace1 = {
    x: [0,square(c)/square(a)],
    y: [square(c)/square(b),0],
    name: 'perfect line',
    mode: 'lines'

  };
  var trace2 = {
    x: getCol(x_feature,0,y,function(a, b) { return a > b; }),
    y: getCol(x_feature,1,y,function(a, b) { return a > b; }),
    name: 'not Cat',
    mode: 'markers',
    type: 'scatter'
  };
  var trace3 = {
    x: getCol(x_feature,0,y,function(a, b) { return a < b; }),
    y: getCol(x_feature,1,y,function(a, b) { return a < b; }),
    name: 'is Cat',
    mode: 'markers',
    type: 'scatter'
  };
  var layout = {
    title: 'Train',
    xaxis: {
      title: '(x1)^2 Axis',
    },
    yaxis: {
      title: '(x2)^2 Axis',
    }
  };
  var data = [traceW,trace1,trace2,trace3];

  Plotly.newPlot('after_feature_graph', data,layout);
  return x_feature;
}
function train_feature(){
  console.log(-w[2]/w[1]);
  w = per.train(w,x_feature,y);
  console.log(w);
  var layout = {
  title: 'Train',
  xaxis: {
    title: '(x1)^2 Axis',
  },
  yaxis: {
    title: '(x2)^2 Axis',
  }
};
  var traceW = {
    x: [0,-w[2]/w[0]],
    y: [-w[2]/w[1],0],
    name: 'weight',
    mode: 'lines'
  };
  var trace1 = {
    x: [0,square(bias)/square(a)],
    y: [square(bias)/square(b),0],
    name: 'perfect line',
    mode: 'lines'

  };
  var trace2 = {
    x: getCol(x_feature,0,y,function(a, b) { return a > b; }),
    y: getCol(x_feature,1,y,function(a, b) { return a > b; }),
    name: 'not Cat',
    mode: 'markers',
    type: 'scatter'
  };
  var trace3 = {
    x: getCol(x_feature,0,y,function(a, b) { return a < b; }),
    y: getCol(x_feature,1,y,function(a, b) { return a < b; }),
    name: 'is Cat',
    mode: 'markers',
    type: 'scatter'
  };

  var data = [traceW,trace1,trace2,trace3];
  Plotly.react('after_feature_graph', data,layout);
}
function finish_train(w){
  var layout = {
    title: 'Finish Trained',
    xaxis: {
      range: [-1.5, 1.5],
      title: 'x1 Axis'
    },
    yaxis: {
      range: [-1.5, 1.5],
      title: 'x2 Axis'
    },
    width: 400,
    height: 400,
    shapes: [
      // Unfilled Circle
      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -bias/a,
        y0: -bias/b,
        x1: bias/a,
        y1: bias/b,
        line: {
          color: 'rgba(148, 50, 96, 200)'
        }
      },

      {
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -Math.sqrt(-w[2])/Math.sqrt(w[0]),
        y0: -Math.sqrt(-w[2])/Math.sqrt(w[1]),
        x1: Math.sqrt(-w[2])/Math.sqrt(w[0]),
        y1: Math.sqrt(-w[2])/Math.sqrt(w[1]),
        line: {
          color: 'rgba(50, 171, 96, 1)'
        }
      }
    ]
  };
  var trace2 = {
    x: getCol(x_per,0,y,function(a, b) { return a > b; }),
    y: getCol(x_per,1,y,function(a, b) { return a > b; }),
    name: 'not Cat',
    mode: 'markers',
    type: 'scatter'
  };
  var trace3 = {
    x: getCol(x_per,0,y,function(a, b) { return a < b; }),
    y: getCol(x_per,1,y,function(a, b) { return a < b; }),
    name: 'is Cat',
    mode: 'markers',
    type: 'scatter'
  };

  var data = [trace2,trace3];

  Plotly.newPlot('feature_finish_graph', data, layout);
}
//end feature trans
//perceptron variable

var w = [0,0,0];
var y = [];
var x_per = [];
var alpha = 0.2;
var a = 0;
var b = 0;
var bias = 0;
var maxX1 = 0;
var maxX2 = 0;
var point;
var data_per;
var options_per;
var allSame = 1;
var numberOfData = 15;
var data_array = [];
//generate();
function generate(scale,draw,result,val){
  data_array = [];
  w = [0,0,0];
  y = [];
  x_per = [];
  allSame = 1;
  maxX1 = 0;
  maxX2 = 0;
  numberOfData = val > 15? val : 15;
  a = Math.floor(Math.random()*scale)+1;
  b = Math.floor(Math.random()*scale)+1;
  bias = Math.random();
  while(allSame == 1){
    for (var i = 0 ; i < numberOfData; i++) {
        x_per[i] = [];
        for (var j = 0; j < 2; j++) {

            x_per[i][j] = Math.random()*2-1 ;
        }
        if(maxX1 < x_per[i][0]){
          maxX1 = x_per[i][0];
        }

        x_per[i][2] = 1.0;
        //console.log(per.result(x_per[i],a,b,bias));
        y[i] = result(x_per[i],a,b,bias);
        if(i > 0 && y[i] != y[i-1] && allSame == 1){
          allSame =0;
        }
    }
  }
  draw(a,b,bias,x_per,y,maxX1);

  //console.log(y)
}
function drawPer(a,b,bias,x_per,y,maxX1){
  data_array = [['X',{label: 'Cat', type: 'number'},{label: 'Not Cat', type: 'number'},'Line','Line'],
  [-maxX1, null, null, 0.0,(a*-maxX1+bias)/b],
  ];
  for ( i = 0 ; i < x_per.length ; i++){
    if(y[i] == 1){
      data_array.push([x_per[i][0],null,x_per[i][1],null,null]);
    }else{
      data_array.push([x_per[i][0],x_per[i][1],null,null,null]);
    }
  }
  //answer
  //data_array.push([1.0, null, null, (a+bias)/b]);
  //train
  data_array.push([maxX1, null, null, 0,(a*maxX1+bias)/b]);
  if(point != null){
    data_per = google.visualization.arrayToDataTable(data_array);
    point.draw(data_per, options_per);
  }
}

export function train(){
  w = per.train(w,x_per,y);
  data_array[1] = [-maxX1, null, null, (w[0]*-maxX1+w[2])/-w[1],(a*-maxX1+bias)/b];
  data_array[data_array.length-1] = [maxX1, null, null, (w[0]*maxX1+w[2])/-w[1],(a*maxX1+bias)/b];
  console.log(w);
  data_per = google.visualization.arrayToDataTable(data_array);
  point.draw(data_per, options_per);
}
//end perceptron variable

function showVal(newVal) {
    document.getElementById("eta").innerHTML = newVal;
    reset(1);
}

function showVal1(newVal) {
    document.getElementById("eta1").innerHTML = newVal;
    reset(0);
}

let MSE = 1;
let LOG = 0;
var next = 0;
var next_log = 0;
var init_x = -5;
var init_x_log = -5;
var learning_rate = 0.01;
var chart;
var chart_log;

var data;
var data_log;
var data_gen;


var x = [
    ['x', 'y', { 'type': 'string', 'role': 'style' }]
];
for (var i = 0; i < 1000; i++) {
    x.push([(i - 500) / 100, square_function((i - 500) / 100), null]);
}
var options = {
    title: 'Mean Square Error',
    curveType: 'function',
    legend: { position: 'bottom' },
    'width': 640,
    'height': 480,
    pointSize: 2
};


var x_log = [
    ['x', 'y', { 'type': 'string', 'role': 'style' }]
];
for (i = 0; i < 1000; i++) {
    x_log.push([(i - 500) / 100, logistic((i - 500) / 100), null]);
}
var options_log = {
    title: 'Classification Error',
    curveType: 'function',
    legend: { position: 'bottom' },
    'width': 640,
    'height': 480,
    pointSize: 2
};

function step(type) {

    if (type == MSE) {
        document.getElementById("iter").innerHTML = ++next;
        init_x -= learning_rate * derivative_square(init_x);
        var update_x = Math.round(init_x * 100) + 500;
        document.getElementById("num").innerHTML = "(" + Math.round(init_x * 100) / 100 + "," + Math.round(square_function(init_x) * 100) / 100 + ")";
        data.setCell(update_x, 2, 'point { size: 12; shape-type: square; fill-color: #a52714; }');
        chart.draw(data, options);
    } else {
        document.getElementById("iter1").innerHTML = ++next_log;
        init_x_log -= learning_rate * derivative_logistic(init_x_log);
        var update_x = Math.round(init_x_log * 100) + 500;
        document.getElementById("num1").innerHTML = "(" + Math.round(init_x_log * 100) / 100 + "," + Math.round(logistic(init_x_log) * 100) / 100 + ")";
        data_log.setCell(update_x, 2, 'point { size: 12; shape-type: square; fill-color: #a52714; }');
        chart_log.draw(data_log, options_log);
    }

}

function reset(type) {


    if (type == MSE) {
        next = 0;
        document.getElementById("iter").innerHTML = next;
        learning_rate = parseFloat(document.getElementById("eta").innerHTML);
        if (learning_rate == null) {
            learning_rate = 0.01;
        }
        document.getElementById("num").innerHTML = 0;
        init_x = -5;
        data = google.visualization.arrayToDataTable(x);
        chart.draw(data, options);
    } else {
        next_log = 0;
        document.getElementById("iter1").innerHTML = next_log;
        learning_rate = parseFloat(document.getElementById("eta1").innerHTML);
        if (learning_rate == null) {
            learning_rate = 0.01;
        }
        document.getElementById("num1").innerHTML = 0;
        init_x_log = -5;
        data_log = google.visualization.arrayToDataTable(x_log);
        chart_log.draw(data_log, options_log)
    }
}
//square error function
function derivative_square(x) {
    return 2 * (x - 1);
}

function square_function(x) {
    return (x - 1) * (x - 1);
}
//end square function


export function drawChart() {
    var i;
    //square error graph
    data = google.visualization.arrayToDataTable(x);
    chart = new google.visualization.LineChart(document.getElementById('piechart'));
    chart.draw(data, options);
    //end square
    //log error graph
    data_log = google.visualization.arrayToDataTable(x_log);
    chart_log = new google.visualization.LineChart(document.getElementById('log'))
    chart_log.draw(data_log, options_log);
    //end log
    //generalization graph
    data_gen = google.visualization.arrayToDataTable([
        ['X', 'YB', 'YR', 'Line'],
        [0, null, null, 0],
        [2, 3, null, null],
        [4, null, 2, null],
        [5, 6, null, null],
        [7, null, 4, null],
        [9, 10, null, null],
        [15, null, null, 15],

    ]);
    var options_gen = {
        title: 'X , Y',
        hAxis: { title: 'X', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Y', minValue: 0, maxValue: 15 },
        legend: 'none',
        interpolateNulls: true,
        curveType: 'function',
        series: {
            0: {

                color: 'blue',
                visibleInLegend: false

            },
            1: {

                color: 'red',
                visibleInLegend: false

            },
            2: { lineWidth: 1, pointSize: 0 }
        },
        'width': 640,
        'height': 480,

    };
    var chart_gen = new google.visualization.ScatterChart(document.getElementById('gen_graph'));
    chart_gen.draw(data_gen, options_gen);
    //end genralization


    //onsole.log(data_array)
    //perceptron
    data_per = google.visualization.arrayToDataTable(data_array);
    options_per = {
        title: 'X , Y',
        hAxis: { title: 'X', minValue: 0, maxValue: 1 },
        vAxis: { title: 'Y', minValue: 0, maxValue: 1 },
        legend: 'none',
        interpolateNulls: true,
        curveType: 'function',
        series: {
            0: {

                color: 'blue',
                visibleInLegend: false

            },
            1: {

                color: 'red',
                visibleInLegend: false

            },
            2: { lineWidth: 1, pointSize: 0 },
            3: { lineWidth: 1, pointSize: 0 }
        },
        'width': 640,
        'height': 480,

    };
    point = new google.visualization.ScatterChart(document.getElementById('p_graph'));
    point.draw(data_per, options_per);
    //end perceptron
}
// log err func
function derivative_logistic(x) {
    return -Math.exp(-x) / (1 + Math.exp(-x));
}

function logistic(x) {
    return Math.log(1 + Math.exp(-x));
}
//end log func
