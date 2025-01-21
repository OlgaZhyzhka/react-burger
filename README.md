# Stellar Burgers App

## React + TypeScript + Vite

This project is a React application bootstrapped with [Vite](https://vitejs.dev/).
It uses TypeScript and ESLint for type checking and linting.

## Deployment

The project includes automatic deployment to an Amazon EC2 server.
Once you push to the main branch (or the configured branch in GitHub Actions), the app will be automatically built and
deployed to the server.

[https://react-burger.duckdns.org/](https://react-burger.duckdns.org/) is the URL of the deployed app.

## Usage

### Clone the repository

```bash
git clone https://github.com/OlgaZhyzhka/react-burger.git
```

switch to the branch `sprint-5/step-1`

```bash
git checkout sprint-6/step-1
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Features

- React
- WebSockets
- Redux Toolkit
- Redux Thunk
- React DnD
- React Router
- TypeScript
- Vite
- ESLint
- Jest
- Cypress

## Running Tests

To run the tests locally, you can use the following commands

### Unit tests

```bash
npm run test
```

### E2E tests

```bash
npm run cypress:open
```

## License

MIT
