importScripts('../build/search.js');  

var app = Elm.Search.init();

addEventListener('message', function (event) {
    app.ports.recvPort.send(event.data);
});

app.ports.sendPort.subscribe(function (result) {
    postMessage(result);
})