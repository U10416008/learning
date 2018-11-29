import {sign} from './perceptron.js';
export function circle_result(x,a,b,c){
  return sign(square(a)*square(x[0])+square(b)*square(x[1])-square(c)*x[2]);
}
export function square(x){return x*x};
