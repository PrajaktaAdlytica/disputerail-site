# Manual Vercel deployment

This is a static React + Vite single-page app. The build output is `dist/client`; the root `vercel.json` sends client-side routes to the app shell.

1. Sign in at [Vercel](https://vercel.com/) using the GitHub account that can access `PrajaktaAdlytica/disputerail-site`.
2. Choose **Add New… → Project**, connect GitHub if prompted, and import `PrajaktaAdlytica/disputerail-site`.
3. Set **Framework Preset** to **Vite** and **Root Directory** to `.`.
4. Set **Build Command** to `npm run build`, **Output Directory** to `dist/client`, and **Install Command** to `npm ci` (automatic install detection is also fine). Leave environment variables empty; this frontend requires none.
5. Choose the production branch shown in the repository (currently initialize/publish `main`), then click **Deploy**.
6. When the deployment finishes, open its URL. Check the home page and directly open a nested path such as `/products/dispute-desk` or `/sign-in`; both should return the app rather than a 404. Check the intro film, mobile layout, and browser console as well.
7. Future pushes to the configured production branch create production deployments. Pull requests and other branches normally get preview deployments. Review the **Deployments** page and build logs if a deployment fails.
8. To add a domain later, add it under the Vercel project's **Settings → Domains**, then apply the DNS records Vercel shows at the domain registrar. No custom domain is configured by this repository.

Vercel interface labels can change. See the current [Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite), [Git integration guide](https://vercel.com/docs/git), and [build settings reference](https://vercel.com/docs/builds/configure-a-build).
