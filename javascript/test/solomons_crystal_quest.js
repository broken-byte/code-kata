import { solomonsQuest } from "../src/solomons_crystal_quest/solution.js";
import { assert } from "chai";


let map1 = [
  [1,3,5],
  [2,0,10],
  [-3,1,4],
  [4,2,4],
  [1,1,5],
  [-3,0,12],
  [2,1,12],
  [-2,2,6]
];
let map2 = [
  [4,0,8],
  [2,1,2],
  [1,0,5],
  [-3,3,16],
  [2,2,2],
  [-1,1,7],
  [0,0,5],
  [-4,3,14]
];
let map3 = [
  [1,1,20],
  [1,2,30],
  [1,3,8],
  [1,0,2],
  [1,1,6],
  [1,2,4],
  [1,3,6],
  [-7,0,100]
];
let map4 = [
  [2,2,100],
  [3,1,25],
  [4,0,8],
  [-6,3,25],
  [-1,2,80],
  [8,0,12],
  [-10,3,220],
  [0,1,150]
];

describe('Solomons Quest', function(){

  it(`should return the correct coordinates for ${map1}`, function(){
    assert.deepEqual(solomonsQuest(map1),[346,40]);
  });

  it(`should return the correct coordinates for ${map2}`, function(){
    assert.deepEqual(solomonsQuest(map2),[68,800]);
  });

  it(`should return the correct coordinates for ${map3}`, function(){
    assert.deepEqual(solomonsQuest(map3),[-600,-244]);
  });

  it(`should return the correct coordinates for ${map4}`, function(){
    assert.deepEqual(solomonsQuest(map4),[530,15664]);
  });
});