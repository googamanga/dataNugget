importScripts("brain.js");

onmessage = function(event) {
  // throw event.data;
  var args = JSON.parse(event.data);
  var parameters = args[0];
  var data = args[1];
  var net = new brain.NeuralNetwork();

  parameters.callback = postProgress;

  // net.train(myData, parameters);
  net.train([
    {input:{VLTY:0.1,TIME:0.333333333,STRIKE:0.0},output:{OPRICE:0.2}},
    {input:{VLTY:0.1,TIME:0.333333333,STRIKE:0.5},output:{OPRICE:0.5}},
    {input:{VLTY:0.1,TIME:0.333333333,STRIKE:1},output:{OPRICE:0.8}}]);


  // net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
  //          {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
  //          {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

  postMessage(JSON.stringify({type: 'result', net: net.toJSON()}));
};

function postProgress(progress) {
  progress.type = 'progress';
  postMessage(JSON.stringify(progress));
}