#git-has-changed
#### Check if a git repo has changed

##### Installation
```bash
npm install git-has-changed
```

##### Usage
```javascript
const gitHasChanged = require('git-has-changed');

let options = {
  repo: 'path/to/repo'
};

gitHasChanged(options, (err, hasChanged) => {
  console.log(hasChanged); // true or false
});
```

For other possible options, please have a look at [gitlog](https://www.npmjs.com/package/gitlog).

##### Test
```bash
npm test
```

##### Changelog
  - 1.0.1
    - fixed typo
  - 1.0
    - Initial commit
