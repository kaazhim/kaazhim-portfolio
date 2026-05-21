# Kaazhim Portfolio

Interactive React + Vite portfolio for KAAZHIM NUR KAARIM BIN RAHIM.

The site presents recruiter-focused case studies with problem, solution, impact, stack, verification status, and source notes. It also includes an interactive Infra Lab dashboard for Kaazhim's current focus areas: server operations, firewall awareness, network support, cybersecurity hygiene, and hardware replacement.

It includes projects from the resume, local source archives, `System_Attendance`, `stridez_new`, and public GitHub repositories from `https://github.com/kaazhim`, excluding anything named `afifah`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Build

```bash
npm run build
```

## Theme

The visual system uses a creative deep-ink and warm-cream base with cobalt, sky blue, violet, teal, butter yellow, and coral accents. The dashboard palette is inspired by Daniel Caesar's `NEVER ENOUGH` era without copying album artwork.

## Change Requests

Use `change-requests/README.md` to write future edits or section ideas.

## Source Audit

- `System_Attendance`: PHP/MySQL project inspected, obvious source errors fixed, and every PHP file syntax-checked with `php -l`.
- `stridez_new`: Flutter/Firebase project inspected, Stridez visual assets copied into the portfolio, and case-sensitive `signup.dart` imports fixed. `flutter analyze --no-pub` timed out locally.
- `REAL-ESTATE`: cloned from GitHub, dependencies installed, and `npm.cmd run build` passed with one Vite chunk-size warning.
- `ElectricityBillEstimator`: cloned from GitHub and `gradlew.bat assembleDebug --no-daemon` passed after setting `ANDROID_HOME` and `ANDROID_SDK_ROOT`.
- `pixel-agents` and `Clawdmeter`: included as GitHub fork exploration entries, not original build claims.

## QA Evidence

Portfolio build passed with Vite. Rendered checks were run in Chrome at desktop and mobile widths with no console errors and no horizontal overflow.
