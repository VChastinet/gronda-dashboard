This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, instal the dependecies  and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) mocked data on the api can be accessed on [http://localhost:3000/api/companies](http://localhost:3000/api/companies) or [http://localhost:3000/api/companie/[id]?[queryparams]](http://localhost:3000/api/company/1?time_unit=MONTH&time_unit_count=1
) and Those endpoint can be edited in `pages/api/companies.js` and `pages/api/companies/[id].js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## basic test configuration were added
Tests can be triggered with `npm run test` or `npm run test:watch`