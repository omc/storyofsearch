# The Story of Search

### Running Locally

If you don't have node on your system, install via brew:

```
brew install node
```

Then clone the repo, setup, and run:

```sh
npm install
npm run dev
```

You can now browse to `http://localhost:8080`

### Building for Production

```sh
npm run build
```

This will build the app and output the files to the `build` directory.

## Running the server

```sh
npm run start
```
This will launch the express server serving content from `build`

### Deploy

```
git push heroku master
```

