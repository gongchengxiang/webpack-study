import Vue from 'vue';
import {test1} from './js/test1';
// import png1 from '@img/test1.png';
import png2 from '@img/test2.png';
import png3 from '@img/test3.png';
import './css/index.scss';
import './js/testgcx';

new Vue({
  el:'#app',
  render:(h)=>{
    return h('div','引入了vue;');
  }
})
console.log(test1);
const appendImg = (imgUrl) => {
  const img = new Image();
  img.src = imgUrl;
  img.width = 200;
  document.body.appendChild(img)
};
// appendImg(png1);
appendImg(png2);
appendImg(png3);
appendImg(png3);
const arr = [1,2,3,4,[5]]
console.log(arr.includes(1))
console.log(arr.flat(Infinity))
class A{
  constructor (a){
    this.a = a||''
  }
  toString(){
    return `${this.a}!`
  }
}
function log(target) { // 这个 target 在这里就是 MyClass 这个类
  target.prototype.logger = () => `${target.name} 被调用`
}
console.log(new A('a').toString())
const map = new Map()
console.log(map)
const set = new Set()
console.log(set)
const asyncFn = async function(){
  await new Promise((resolve)=>{
    resolve(1)
  })
}
asyncFn()
const asyncFn1 = async function(){
  await new Promise((resolve)=>{
    resolve(1)
  })
}
asyncFn1()
const asyncFn2 = async function(){
  await new Promise((resolve)=>{
    resolve(1)
  })
}
asyncFn2()
const gFn =function*(){
  yield 1
}
gFn()
const gf1 = function * (){
  yield 1
}
gf1()
const testImport = async ()=>{
  const test2 = await import('./js/test2.js')
  return test2
}
testImport().then(res=>{
  console.log(res)
})