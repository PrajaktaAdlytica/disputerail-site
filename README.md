# DisputeRail

DisputeRail is a research-stage concept for issuer-side Regulation E consumer EFT case preparation. This repository contains the responsive React website and a clearly fictional, synthetic case-workbench preview. It is not an operating banking product.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

The local preview uses Vite. The production build is:

```sh
npm run build
```

The static Vite site is written to `dist/client`. `npm run build` also prepares the separate Codex Sites hosting artifacts under `dist/server` and `dist/.openai`; Vercel serves only `dist/client`.

## Quality checks

```sh
npm run test:demo
npm run test:sites
```

The demo uses synthetic case data only. Changing the case to credit-card billing invalidates the Reg E dates; Reg Z is not treated as an interchangeable clock. No bank writes, funds movement, determination, denial, customer notice delivery, authentication, or case upload is connected. Forms prepare local drafts and do not deliver them. Read `design-qa.md` and `docs/route-coverage.md` for browser QA notes and route coverage.

## Deploy on Vercel

The repository includes a `vercel.json` SPA rewrite so direct visits to client-side routes load the app shell. In Vercel, import this GitHub repository and configure:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | `.` |
| Install command | `npm ci` (or leave automatic detection enabled) |
| Build command | `npm run build` |
| Output directory | `dist/client` |
| Environment variables | None required for this frontend |

Do not set a `VITE_*` secret in client code; values prefixed with `VITE_` are bundled into browser assets. See `docs/vercel-deployment.md` for the manual import and launch checklist.

## Launch boundaries

All named institutions, members, cases, amounts, and outcomes in the preview are fictional. Rule pack `RE-DEMO-0.1` is illustrative and has not been approved by counsel. Dates are a deterministic fixture, not a general regulatory calculation engine. Pricing is a research hypothesis. No customer, certification, live integration, savings, accuracy, or compliance outcome is claimed.

Before collecting real inquiries, connect a real company/controller contact, approved privacy notice and deletion route, secure form-delivery endpoint, retention policy, and spam protection. Before any live pilot, follow the brief's separate counsel, privacy/model-risk, sandbox, compliance, representative replay, and paid-pilot gates.

Sources shown in the product disclosures: [CFPB Regulation E §1005.11](https://www.consumerfinance.gov/rules-policy/regulations/1005/11/) and [CFPB Regulation Z §1026.13](https://www.consumerfinance.gov/rules-policy/regulations/1026/13/).
