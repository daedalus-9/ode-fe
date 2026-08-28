# Owner Driver Exchange frontend

Next.js Pages Router frontend for Owner Driver Exchange. It provides capacity and partner enquiry routes plus direct contact. It is not represented as a public live-load board, an authenticated marketplace or an automated matching service.

## Route policy

- `/` - indexable proposition, audience selection and enquiry forms
- `/how-it-works/` - indexable explanation of supported functionality
- `/peak-period-haulage-capacity/` - indexable seasonal capacity-planning guide
- `/great-britain-haulage-coverage/` - England, mainland Scotland and Wales road-coverage hub
- `/haulage-routes/` and reviewed lane routes - finite city-to-city guidance
- `/haulage-postcodes/` and reviewed area routes - finite postcode-area guidance
- `/privacy-policy/` - linked `noindex, follow` enquiry-data privacy notice
- `/signin/` - permanent redirect to the working capacity journey; no account UI is exposed
- three country pages - indexable regional capacity guides
- retired component-leak routes - permanent redirects to the appropriate regional page

The generated sitemap excludes privacy, sign-in, redirects, form fragments and non-canonical routes. Lane pages use blocking static generation with daily revalidation.

## Integration contracts

- Capacity form: JSON `POST` to `${NEXT_PUBLIC_API_URL}/place-truck` with the existing fields plus `sourceSite`, `sourceUrl`, `submissionId`, explicit `marketingConsent`, and a honeypot.
- Partner form: JSON `POST` to `${NEXT_PUBLIC_API_URL}/partner-join` with the existing fields plus the same attribution, idempotency, consent and abuse-control fields.

The backend validates, stores and timestamps a submission before returning 2xx. Acceptance does not promise a load, rate, booking, membership or work.

ODE keeps load-provider contact as direct call/email actions to preserve its separate public journey. Contact actions render only labels such as `Call us` and `Email us`; verified destinations remain behind `tel:` and `mailto:` links with descriptive accessible names. No Logic Freight name or contact value is visibly printed on public ODE routes.

## Environment and analytics

- `NEXT_PUBLIC_SITE_URL` - canonical public origin. Local fallback: `http://localhost:3000`.
- `NEXT_PUBLIC_API_URL` - HTTPS origin of the shared API. It must be set in production; development falls back to `http://localhost:3001`.

Copy `.env.example` into the deployment environment. Analytics scripts were removed because the repository has no approved ODE consent configuration; add analytics only through an approved consent-gated implementation.

## Commands

```text
npm run dev
npm run typecheck
npm run lint
npm test
npm run test:mock-api
npm run build
```

Read the root `AGENTS.md` and `docs/seo/` before changing routes, positioning, metadata or forms.
