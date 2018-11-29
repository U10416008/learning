//var x = [[0,0],[0,1],[1,0],[1,1]]
var alpha = 1;
export function sign(wx) {
    if (wx >= 0){
      return 1;
    }
    return -1;
}
export function result(x,a,b,bias){
  var wx = x[0] * a - x[1] * b + x[2]*bias;

  return sign(wx);
}
export function dot(w,x){
  var d = 0;
  for (let i = 0 ; i < x.length;i++){
    d += x[i] * w[i];
  }
  return d;
}
export function update(w,x,err){
  for(var j = 0 ; j < w.length; j++){
    w[j] += alpha * err * x[j];
  }

  return w;
}
export function train(w,x,y){
  console.log(x.length);
  for(var i = 0 ; i < x.length ; i++){

    var pred = sign(dot(w,x[i]));
    if(pred != y[i]){
      w = update(w,x[i],y[i]);
    }
  }

  return w ;

}
