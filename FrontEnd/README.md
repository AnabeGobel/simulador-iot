# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Password recovery

Configure the frontend environment variables with the Supabase project values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://your-public-frontend-domain.example
```

`VITE_APP_URL` is used for password recovery links in production. When it is
not set, local development uses the current origin automatically. In Supabase,
add `https://simulador-iot.vercel.app/redefinir-senha` to the Auth
redirect URLs, and keep `http://localhost:8080/redefinir-senha` for local tests.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
