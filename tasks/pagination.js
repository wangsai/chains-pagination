/*
 * chains-pagination
 * https://github.com/saiwang/chains-pagination
 *
 * Copyright (c) 2013 WangSai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._;
  var yaml = require('js-yaml');
  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pagination', 'pagination.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      data: [], //the Data
      perPage: 10, //how many items each page
      dest: '/',  //destination folder
      fileNameTemplate: 'page{{index}}',  //file name of each page. refer: http://gruntjs.com/api/grunt.template
    });

    var totalPageNum = Math.floor((options.data.length + options.perPage)/options.perPage),
      totalPages = _.range(1, totalPageNum + 1);

      grunt.log.write('data.length:' + options.data.length);
    grunt.log.write('totalPageNum:' + totalPageNum);
    
    totalPages.forEach(function(index){
      var items = _.first(options.data, options.perPage),
            fileName = options.fileNameTemplate.replace(/(\{\{\s*index\s*\}\})/g, index);

            grunt.log.write('fileName:' + fileName);
      var aPage = {
        items: items, //data of current page
        index: index, //current page index
        total: totalPageNum// total pages
      };

      // Write the destination file.
      grunt.file.write(path.join(options.dest, fileName), "---\n" + yaml.safeDump(aPage) + "---\n");

      // Print a success message.
      grunt.log.writeln('Page "' + index + '" created.');            
    });
    

  });

};
