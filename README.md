# Super Download
Super Download is an async download node module compatible with Q(Promises).
  
> This overrides the default behavior of download-file to work with the Q library
### Version
1.0.0
### Installation
You need npm installed globally:
```sh
$ npm install super-download --save
```
Usage:
```js
 var sd = require("super-download");
 var Q = require("q");
 sd("http://www.orimi.com/pdf-test.pdf", {
            directory: "./downloads/test",
            filename: "fluke3.pdf"
        }).then(function(){
            console.log("Finally Q is in control");
        });
 
```
Made with Love from GH

