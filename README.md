# NetAdvisor

**A network setup recommender for homes, shops, offices and labs.** Answer five questions and NetAdvisor estimates the internet speed you need, then ranks listed internet plans and equipment bundles against your budget, space and priorities, with the reasons shown.

> Prototype for a college research project. Prices, plans and availability are estimates from public listings and must be verified with the provider before buying. NetAdvisor does not connect to routers or provider systems.

## Features

- **Find My Internet:** a five-step wizard (place, people and devices, activities, space and budget, priority) with validated number fields.
- **Recommendations:** best match plus alternatives from other providers, speed, space and budget bars, a "Why this recommendation?" explanation, provider review confidence, extra hardware list, security tips by OSI layer, CSV export and print.
- **No-fit handling:** if nothing meets every constraint, it says so and shows the closest options with their limits.
- **Compare Providers:** search, filters, sorting and side-by-side comparison of up to three plans, plus review and support evidence per provider.
- **Hardware Catalog:** searchable cards with pictures, price ranges, sorting and the equipment bundles the engine ranks.
- **Network Troubleshooting:** a step-by-step flow for six common problems.
- **Learn Networking:** 18 beginner topics, the seven OSI layers with tips for your setup, and a searchable dictionary.
- **Saved Sessions and Feedback:** save, rename, reopen and delete results; star ratings and optional reviews. Stored in the browser only.
- **Settings:** light and dark themes, data controls.

## Tech stack

React 18, Vite 6, Tailwind CSS 4, React Router 7 (hash routing), Recharts 3, Framer Motion 11, Lucide icons. Tests use Node's built-in test runner. Linting uses ESLint with React, hooks and accessibility rules.

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the 32 logic tests (engine, data, storage, CSV) |
| `npm run lint` | Lint the code |
| `npm run check` | Lint, test and build (also run by CI) |
| `npm run images` | Optional: download Creative Commons hardware photos (see below) |

## How the recommendation works

1. **Estimate the speed needed** from activities, people and devices. Only part of a large group is assumed active at once, and the busiest activity per person counts most.
2. **Apply hard limits.** Remove every plan and equipment pair that misses the speed, coverage, device count, monthly budget or equipment budget.
3. **Rank what is left with TOPSIS** over monthly cost and equipment cost (relative to your budgets), speed fit, provider review score, coverage and device fit, support score, and price data confidence. Speed and coverage stop earning credit once your need is comfortably met, so extra speed is not rewarded. The weights come from your chosen priority and are shown on the results page.
4. **If nothing qualifies,** show the closest options with each limitation spelled out.

The fit score is a relative ranking inside the list, not a quality rating of a provider. No provider is hardcoded.

## Project structure

```
src/
  components/   Layout, dialogs (focus trapped), hardware pictures, chart, shared UI
  context/      Theme, wizard answers, saved sessions and feedback (LocalStorage)
  data/         Plans, provider reviews, support scores, sources, equipment, learning content
  pages/        One lazy-loaded file per page
  utils/        Recommendation engine, saved-data validation, CSV, keyboard helpers, tests
scripts/        Optional hardware photo downloader
public/hardware Place real product photos here (see README.txt in that folder)
.github/        CI workflow (lint, test, build)
```

## Data and honesty notes

- Plan data is a snapshot from 14 October 2026. Only the ACT and Hi Reach plans come from Warangal listings (third-party sites). Other providers come from 2026 guides or tariff sheets for other places, and BSNL from a Chennai-circle sheet.
- Review and support scores are judgements from benchmarks and complaint sites, from different years and places. They are not a Warangal survey. Where no repair-time data was found, support is scored cautiously at 2.75.
- Equipment prices and specifications are sample values.
- Hardware pictures are drawn illustrations. To show real photos, add files named `router.jpg`, `switch.jpg`, `nas.jpg` and so on to `public/hardware/` (the list is in that folder's README). Only use photos you have the right to use. `npm run images` can download Creative Commons photos from Wikimedia Commons and record credits; check its results by hand, because that script has not been tested against the live service.

To improve results, edit `src/data/plans.js` with verified, current Warangal plans and equipment prices.

## Accessibility

Keyboard operable throughout: dialogs and the mobile menu trap focus and close with Escape, menus close on outside click, tab lists support arrow keys, fields have labels and error messages, and animation respects the reduced-motion setting.

## Privacy

Everything is stored in the browser (LocalStorage). Nothing is sent to a server. Feedback names and reviews are optional and stay on the device. Use the Settings page to delete saved data.

## Deployment

`npm run build` creates a static site in `dist/`. Hash routing means it works on any static host without server rules. For GitHub Pages under a repository path, set `base: "/your-repo-name/"` in `vite.config.js` first.

## Known limitations

- Cheap adequate plans win often, and the data holds only a few, so one or two providers can dominate some priorities. Adding verified Warangal plans is the real fix.
- Areas above 5,000 sq ft are not supported.
- Tests cover the logic only; there are no component tests.
- Data is not shared between devices and there are no accounts.

## License

Mohammed Naveed Ullah @2026
