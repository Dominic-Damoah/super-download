var fs = require('fs')
var url = require('url')
var http = require('http')
var https = require('https')
var mkdirp = require('mkdirp')
var path = require('path')
var Q = require('q')
/**
 * Async Download function compatible with Q(promises)
 * @author Damoah Dominic
 * @param   {string}  remote_url URL to be downloaded
 * @param   {object}  options    Configuration Options
 * @returns {Promise} A Q'able promise
 */

module.exports = function super_download(remote_url, options) {
    
     return Q.promise(function(resolve,reject,notify){
        
        options = typeof options === 'object' ? options : {}
        options.timeout = options.timeout || 20000
        options.directory = options.directory ? options.directory : '.'

        var uri = remote_url.split('/')
        options.filename = options.filename || uri[uri.length - 1]

        var path = options.directory + "/" + options.filename

        if (url.parse(remote_url).protocol === null) {
            remote_url = 'http://' + remote_url
            req = http
        } else if (url.parse(remote_url).protocol === 'https:') {
            req = https
        } else {
            req = http
        }
        
        var request = req.get(remote_url, function(response) {

        if (response.statusCode === 200) {

          mkdirp(options.directory, function(err) { 
            if (err) reject(err)
            var file = fs.createWriteStream(path)
            response.pipe(file)
          })

        } else {
            reject(new Error("[Error] --> Status Code: "+response.statusCode))
        }

        response.on("end", function(){
            resolve(path);
        })

        request.setTimeout(options.timeout, function () {
          request.abort()
          reject(new Error("[Error] --> Time out: "+options.timeout))
        })

      }).on('error', function(e) {
            reject(e);
        })
        
    });
}