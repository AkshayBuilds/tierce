# E-Commerce App

This repository contains a full-stack e-commerce application split into three main folders:

- `admin/` — admin dashboard built with React and Vite
- `client/` — customer-facing storefront built with React and Vite
- `server/` — backend API built with Node.js and Express

## Project Structure

- `admin/`
  - `src/` contains admin UI components, pages, and styles
  - `package.json` defines admin dependencies and scripts
  - `vite.config.js` configures the Vite build

- `client/`
  - `src/` contains the storefront UI, pages, and shop context
  - `package.json` defines client dependencies and scripts
  - `vite.config.js` configures the Vite build

- `server/`
  - `server.js` starts the Express API server
  - `Routes/`, `Controllers/`, and `Models/` contain backend routing and data logic
  - `config/` holds database and Cloudinary config files
  - `package.json` defines server dependencies and scripts

## Getting Started

### Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

### Client Storefront

```bash
cd client
npm install
npm run dev
```

### API Server

```bash
cd server
npm install
npm start
```

## Notes

- Run the server before using the client or admin app so API requests can succeed.
- Verify environment variables and database configuration in `server/config/db.js` and `server/config/coudinary.js`.
- Each folder has its own Vite/Node configuration and dependencies.

## License

This repository does not include a license file. Add one if you want to define reuse terms.

live on : https://tierce-ecom.vercel.app/
Admin Panel: https://tierce-admin.vercel.app/
admin Email or pass
a@gmail.com
aaaaaaaa
