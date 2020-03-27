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

// For synchronous call
let hasChanged = gitHasChanged(options);
```

For other possible options, please have a look at [gitlog](https://www.npmjs.com/package/gitlog).

##### Test
```bash
npm test
```

##### Changelog
  - 1.1.2
    - Update dependencies
  - 1.1.1
    - fixed unresolved dependencies
  - 1.1.0
    - added synchronous function call
  - 1.0.2
    - fixed error handling
  - 1.0.1
    - fixed typo
  - 1.0
    - Initial commit
