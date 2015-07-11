/**
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


var Q = require('q');
var bower = require('bower');
var _ = require('lodash');

// define registry module
module.exports = {

  // fetch all widget informations
  get: function(name){
    var deferred = Q.defer();
    bower.commands
      .info(name)
      .on('end', function(info) {
        deferred.resolve(info);
      })
      .on('error', function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  },

  // fetch a list of all widgets
  getAll: function(){
    var self = this;
    var deferred = Q.defer();
    bower.commands
      .search('adf-widget', {})
      .on('end', function(widgets) {
        var result = [];
        _.forEach(widgets, function(widget){
          result.push({
            name: widget.name,
            link: '/v1/widgets/' + widget.name
          });
        })
        deferred.resolve(result);
      })
      .on('error', function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }

}
