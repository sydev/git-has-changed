(function() {
  'use strict';

  const assert        = require('assert');
  const exec          = require('child_process').exec;
  const path          = require('path');

  const gitHasChanged = require('../index');

  const gitDir        = path.join(process.cwd(), 'temp_git');


  let git             = require('simple-git');
  let options         = {repo: gitDir};




  describe('create fake git repo', () => {
    it('should be created', (done) => {

      exec(`mkdir -p ${gitDir} && cd  ${gitDir} && touch file.ext && cd ..`, (err, stdout, stderr) => {
        if (err) throw err;

        git = git(gitDir);
        git.init(done);
      });

    });
  });

  describe('git has changed', () => {
    it('should be false', (done) => {

      gitHasChanged(options, (err, hasChanged) => {
        assert.equal(false, hasChanged);
        done();
      });

    });
  });

  describe('send commit', () => {
    it('should be commited', (done) => {

      git.add('./*')
        .commit('test commit', done);

    });
  });

  describe('git has changed', () => {

    describe('all time', () => {
      it('should be true', (done) => {

        gitHasChanged(options, (err, hasChanged) => {
          assert.equal(true, hasChanged);
          done();
        });

      });
    });

    describe('last week', () => {
      it('should be true', (done) => {
        let date = new Date();

        options.after = '7 days ago';

        gitHasChanged(options, (err, hasChanged) => {
          assert.equal(true, hasChanged);
          delete options.after;
          done();
        });

      });
    });

    describe('before last week', () => {
      it('should be false', (done) => {

        options.before = '7 days ago';

        gitHasChanged(options, (err, hasChanged) => {
          assert.equal(false, hasChanged);
          delete options.before;
          done();
        });

      });
    });

  });


  // Synchronous
  describe('git has changed synchronous', () => {

    describe('all time', () => {
      it('should be true', () => {
        assert.equal(true, gitHasChanged(options));
      });
    });

    describe('last week', () => {
      it('should be true', () => {
        options.after = '7 days ago';
        assert.equal(true, gitHasChanged(options));
        delete options.after;
      });
    });

    describe('before last week', () => {
      it('should be false', () => {
        options.before = '7 days ago';
        assert.equal(false, gitHasChanged(options));
        delete options.before;
      });
    });

  });

  describe('delete fake git repo', () => {
    it('should be deleted', (done) => {

      exec(`rm -rf ${gitDir}`, done);

    });
  });

})();
