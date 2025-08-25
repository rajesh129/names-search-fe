# React 19 + TypeScript + Formik + Yup + Zustand (Vite)

A minimal, batteries‑included scaffold for front‑end apps using:

- **React 19**
- **TypeScript**
- **Vite**
- **Formik** (forms)
- **Yup** (validation)
- **Zustand** (state)

## Quickstart

```bash
# 1) Unzip and enter the folder
cd react19-ts-formik-yup-zustand

# 2) Install deps (pick one)
npm i
# or
yarn
# or
pnpm i

# 3) Run dev server
npm run dev
# open the printed local URL in your browser
```

## What’s inside?

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── main.tsx
    ├── lib
    │   └── validation.ts         # Yup schemas
    ├── store
    │   └── useUserStore.ts       # Zustand store
    ├── types
    │   └── index.ts              # Shared TS types
    └── components
        └── forms
            └── ProfileForm.tsx   # Formik example wired to Zustand
```

## Notes

- Uses `@vitejs/plugin-react-swc` for fast TS/JSX transforms.
- Strict TypeScript options are enabled; adjust `tsconfig.json` to your taste.
- Replace the example profile form with your domain components and schemas.
- If you prefer ESLint/Prettier, add them when you’re ready to enforce rules.

## Added toolchain

- **MUI** for UI components
- **Axios** with a pre-configured instance (`src/lib/axios.ts`)
- **ESLint** + **Prettier** with opinionated defaults

### Commands

```bash
npm run lint       # check
npm run lint:fix   # fix
npm run format     # format with Prettier
```

### Environment

Copy `.env.example` to `.env` and set:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

MUI is wired via `App.tsx` with `ThemeProvider` and `CssBaseline`. The sample form uses MUI `TextField` through a small Formik wrapper component.
