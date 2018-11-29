var items = {'pencil' : {'id':0,'img':'pencil.jpg' , 'weight' : 1,'value' : 6,'available':0},
'pen' : {'id':1,'img':'pen.jpg' , 'weight' : 2,'value' : 10,'available':0},
'eraser' : {'id':2,'img':'eraser.jpg' , 'weight' : 3,'value' : 10,'available':0},
'toy' : {'id':3,'img':'toy.jpg' , 'weight' : 3,'value' : 12,'available':0}}
var maxWeight = 0;
var answer = 0;

$("#sendWeight").click(function(){
  maxWeight = Number($("#limit_weight").val())
  answer =zero_one_knapsack(maxWeight);


})

var weight = 0;
var value_c = 0;
var id_check = "_check";
//for(var i = 0; i < )

for (var item in items) {
  insertItem(document.getElementById('check_container'),getCheckBoxHTML(item,item));
}

$('input[type=checkbox]').each(function () {
  $(this).change(function(){
    answer =zero_one_knapsack(maxWeight);
    var checked = (this.checked ? "1" : "0");
    var item = this.value;
    if(checked == 1 && items[item].available == 0){
      items[item].available=1;
      var child = '<div class="grid-item" id="'+item+'" draggable="true" ondragstart="drag(event)"><img class="image" src="/static/images/'+items[item].img+'" ><p>Weight:'+items[item].weight+'</p><p>Value:'+items[item].value+'</p></div>'
      //console.log(item)
      insertItem(document.getElementById('source-container'),child);
    }else if(checked == 0){
      items[item].available=0;
      $("#"+item).remove();
    }
  });

});


function insertItem(parent,child){
  var e = document.createElement('div');
  e.innerHTML = child;
  while(e.firstChild) {
      parent.appendChild(e.firstChild);
  }
}

function getCheckBoxHTML(id,value){
  return '<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="'+id+id_check+'" value="'+value+'"><label class="form-check-label" for="inlineCheckbox1">'+item+'</label></div>';
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("parent_text", ev.target.parentNode.id);
}

function drop(ev) {
    if(ev.target.id == 'target-container' || ev.target.id == 'source-container'){
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var parent = ev.dataTransfer.getData("parent_text");
      if(updateWV(parent,ev.target.id,data)){
      //console.log(ev.target.id + ' and ' +data);
        ev.target.appendChild(document.getElementById(data));
      }
    }else if(ev.target.className == 'grid-item'){
      ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var parent = ev.dataTransfer.getData("parent_text");
        //console.log(ev)
        if(updateWV(parent,ev.target.parentNode.id,data)){
          ev.target.parentNode.appendChild(document.getElementById(data));
          if(weight <= maxWeight && value_c == answer){
            $("#overWeight").html("The Best Allocation!!");
          }
        }
    }
}
function updateWV(parent,id,data){
  if(id != parent){

    if(id == 'target-container'){
      if(weight + items[data].weight <= maxWeight){
        weight += items[data].weight;
        value_c += items[data].value;
        //console.log(weight)
        $("#current_weight").html(weight);
        $("#current_value").html(value_c);
        $("#overWeight").html("");
        return true;
      }else{
        $("#overWeight").html("Over Max Weights");
        return false;
      }


    }else{
      $("#overWeight").html("");
      weight -= items[data].weight;
      value_c -= items[data].value;
      console.log(value_c)
      $("#current_weight").html(weight);
      $("#current_value").html(value_c);
      return true;
    }
  }
  return false;
}
function zero_one_knapsack(weight){
  var bag = [];
  var number = 0;
  var id = 0;
  bag[0] = []
  bag[0][0] = 0;
  id++;
  for (item in items) {
    //console.log(items[item].available);
    if(items[item].available != 0){
      items[item].id = id;
      bag[id] = [];
      bag[id][0] = 0;
      id++;
    }
  }
  //console.log(items);
  for (var i = 1; i <= weight; i++) {
    bag[0][i] = 0;
    for(item in items){
      if(items[item].available != 0){
        let temp_id = items[item].id;
        if(i >= items[item].weight){

          let v = bag[temp_id-1][i - items[item].weight] + items[item].value;
          bag[temp_id][i] = bag[temp_id-1][i] > v ? bag[temp_id-1][i] : v;
        }else{
          bag[temp_id][i] = bag[temp_id-1][i];
        }
      }

    }

  }
  console.log(bag[id-1][weight]);
  return bag[id-1][weight];


}
