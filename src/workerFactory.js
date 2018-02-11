const blob = new Blob([`
    self.onmessage = function(e) {
        var data = e.data;
        if (data.importScripts) {
            importScripts();
        }
    };
`]);

const worker = new Worker(window.URL.createObjectURL(blob));
worker.postMessage({importScripts: 'actor-system.js'});
