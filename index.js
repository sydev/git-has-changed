(function() {
  'use strict';


  const gitLog      = require('gitlog');
  const isGit       = require('is-git-check');
  const objectMerge = require('object-merge');

  /**
   * Checks if a git repository has changed
   * @param  {Object}   options  [object of options (hav a loog at https://www.npmjs.com/package/gitlog for possible optins)]
   * @param  {Function} callback [callback function]
   * @return {Boolean}
   */
  function hasChanged(options, callback) {
    let error         = null,
      result          = false,
      defaultOptions  = {
        repo: process.cwd(),
        number: 1,
        date: 'local',
        sync: false
      };

    options = objectMerge(defaultOptions, options);

    // If the given 'dir' parameter isn´t a git repository, return an error
    if (!isGit(options.repo)) {
      error = new Error('The given "dir" parameter isn´t a git repository');
      return callback(error, result);
    }



    if (!callback) {
      let commits = gitLog(options);
      result = (commits.length > 0);
      return result;
    } else {

      gitLog(options, (err, commits) => {
        if (err) error = err;
        result = (commits.length > 0);

        callback(error, result);
      });
    }
  }



  module.exports = exports = hasChanged;

})();
