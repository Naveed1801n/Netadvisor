# NetAdvisor (React)

A React + Vite + Tailwind CSS network setup recommender. It estimates the speed you need, then ranks listed internet plans and equipment bundles against your budget, space and priorities.

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run check    # lint + tests + production build (also run by CI)
npm test         # node:test suites for the engine, data, storage and CSV
npm run images   # optional: download Creative Commons hardware photos (see scripts/)
```
Requires Node 20 or newer.

## Structure
- `src/data/plans.js`: plans, provider reviews, support scores, price sources, equipment bundles and catalogue (estimates, see notes).
- `src/utils/engine.js`: bandwidth estimate, hard budget/need filters, TOPSIS ranking, explanations, extras list and OSI tips.
- `src/utils/storage.js`: validates and repairs saved data on load. `src/components/ErrorBoundary.jsx` offers a reset if anything still fails.
- `src/context/AppContext.jsx`: theme, wizard answers, saved sessions and feedback (LocalStorage only).
- `src/components/`: layout, dialogs (focus trapped), hardware pictures, shared UI. `src/pages/`: one lazy-loaded file per page.

## How the ranking works
1. Estimate the speed needed from activities, users and devices.
2. Remove every plan and equipment pair that misses the speed, coverage, device count or either budget.
3. Rank the rest with TOPSIS over: monthly cost and equipment cost (relative to your budgets), speed fit, provider review score, coverage and device fit, support score, and price data confidence. Speed and coverage stop earning credit once the need is comfortably met. The weights come from your priority and are shown on the results page.
4. If nothing qualifies, say so and show the closest options with their limitations.
The fit score is a relative ranking inside the list, not a quality rating.

## Data notes
Plan prices are a snapshot (14 October 2026) and estimates; only the ACT and Hi Reach plans come from Warangal listings. Review and support scores are judgements from benchmarks and complaint sites, not a Warangal survey. Where no repair-time data was found, support is scored cautiously at 2.75. Equipment prices and specifications are sample values. Hardware pictures are illustrations unless photos are added (see `public/hardware/README.txt`).

## Known limitations
- The recommendation favours cheap adequate plans, and the data contains only a few, so one or two providers win often. Add verified Warangal plans to `src/data/plans.js` to improve this.
- Areas above 5,000 sq ft are not supported.
- Tests cover the logic; there are no component tests.
- Everything is stored in the browser. Nothing is sent to a server.
