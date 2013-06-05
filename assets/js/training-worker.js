importScripts("brain.js");

onmessage = function(event) {
  // throw event.data;
  var args = JSON.parse(event.data);
  var parameters = args[0];
  var data = args[1];
  var net = new brain.NeuralNetwork();

  parameters.callback = postProgress;

  net.train(data, parameters);
  postMessage(JSON.stringify({type: 'result', net: net.toJSON()}));
};

function postProgress(progress) {
  progress.type = 'progress';
  postMessage(JSON.stringify(progress));
}