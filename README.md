# The Story of Search

### Running Locally

If you don't have node on your system, install via brew:

```
brew install node
```

Then clone the repo, setup, and run:

```sh
npm install
npm run start
```

You can now browse to `http://localhost:8080`

### Building for Production

```sh
npm run build
```

### Deploy

One will need s3 access to the storyofsearch bucket and aws cli.  Then the command is:

```
rake publish
```

