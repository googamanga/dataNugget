importScripts("brain.js");

onmessage = function(event) {
  var data = JSON.parse(event.data);
  var net = new brain.NeuralNetwork();

  net.train(data, {
    iterations: 9000,
    callback: postProgress,
    callbackPeriod: 1000
  });

  postMessage(JSON.stringify({type: 'result', net: net.toJSON()}));
};

function postProgress(progress) {
  progress.type = 'progress';
  postMessage(JSON.stringify(progress));
}