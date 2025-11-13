# Cinema Booking FE

> Fauzan Bima - Teknikal test FE Peruri

## Tentang Project

Project ini menggunakan external api, dengan be pada repository berikut [`Cinema Booking Be`](https://github.com/f0bima/cinema-booking-be). repository tersebut hasil fork dari [`gcode/cinema-booking`](https://github.com/gcode/cinema-booking) dengan sedikit revisi pada google sso.<br>

Ada 2 role user yang bisa mengakses app ini, yaitu `admin` dan `customer`. <br>
Khusus untuk email dan password `admin` sementara bisa di-set lewat .env karean auth service belum memiliki fitur register `admin`

## Running the Project Locally

buat file `.env` dengan menyalin file [`sampleenv`](sampleenv), isi variable yang tersedia sesuai dengan data yang diperlukan<br>

## Project Structure

Project ini menggunakan Clean Architecture dengan Feature-based structure

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── features
│   │   └── myfeature
│   │   │   └── application
│   │   │   └── domain
│   │   │   └── infrastructure
│   │   │   └── presentation
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run test`            | Running Test                                     |
| `npm run test:coverage`   | Running Test Coverage                            |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
