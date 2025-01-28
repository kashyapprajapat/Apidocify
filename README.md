# Apidocs

Automatically generate Swagger/OpenAPI documentation for your Express APIs.

## Installation
```bash
npm install apidocs
```

After installing it add in tot he main server file for your api
```bash
const express = require('express');
const Apidocify = require('apidocify');

const app = express();
const port = 3000 || process.env.port;

// Add routes
app.get('/users', (req, res) => res.send('Users route'))
.apidoc = {
    summary: 'Get all users',
    responses: {
      200: { description: 'List of users' },
      500: { description: 'Server error' }
    }
};

app.post('/users', (req, res) => res.send('User created'));

// Initialize apidocify  after defing all your route
new Apidocify(app, {
  docsPath: '/docs',
  title: 'kashyap api',
  version: '2.0.0'
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

After this run your server and hit the /docs route for api documentation
```bash
node server.js
```

feel free to submit pullrequest.