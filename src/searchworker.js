importScripts('../build/search.js');

var app = null;

addEventListener('message', function (event) {
    var type = event.data[0];

    switch (type) {
        case "port":
            if (app) {
                app.ports.recvPort.send(event.data[1]);
            }

            break;
        
        case "localStorage":
            app = Elm.Search.init({flags: {
                permission: event.data[1],
                data: event.data[2]
            }});

            app.ports.sendPort.subscribe(function (result) {
                postMessage(["port", result]);
            });
            
            app.ports.storeData.subscribe(function (result) {
                postMessage(["localStorage", result]);
            });

            break;
    }
});