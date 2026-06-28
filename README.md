 ## FinSight — Expense Tracker

A simple, fast expense tracking app built with Next.js, MongoDB, and Tailwind CSS. Track your spending, filter by date or category, and visualize where your money goes with an interactive pie chart.

## Live Link : 

## Features

- **Add, edit, and delete expenses** — quick modal forms for managing entries
- **Filter by date or category** — narrow down your expense list instantly
- **Spending breakdown chart** — interactive pie chart powered by Recharts, grouped by category
- **Responsive design** — card layout on mobile, full table on desktop
- **Running total** — see your filtered total update live

## Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **UI Components:** HeroUI React
- **Charts:** Recharts
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
MONGODB_URI=your-mongodb-connection-string
```

### Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── all-expenses/
│   └── page.tsx          # Main expense tracker page (table, chart, filters)
├── api/
│   └── expenses/
│       ├── route.ts      # GET (list) and POST (create) expenses
│       └── [id]/
│           └── route.ts  # PUT (update) and DELETE expense by id
├── components/
│   ├── NavBar.tsx
│   └── CashflowLogo.tsx
└── layout.tsx

lib/
└── mongodb.ts            # Mongoose connection helper

models/
└── Expense.ts             # Mongoose schema for Expense documents
```

## API Reference

| Method | Endpoint              | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/expenses`       | List expenses (supports `date` and `category` query filters) |
| POST   | `/api/expenses`       | Create a new expense                  |
| PUT    | `/api/expenses/:id`   | Update an existing expense             |
| DELETE | `/api/expenses/:id`   | Delete an expense                      |

### Expense Object

```ts
{
  _id: string;
  date: string;        // ISO 8601 string, e.g. "2026-06-28T00:00:00.000Z"
  description: string;
  category: "Food" | "Transport" | "Health" | "Shopping" | "Other";
  amount: number;
}
```

## Notes

- Dates are stored as ISO 8601 strings. When creating or updating an expense, the date is always normalized with `.toISOString()` before saving, so date-based filtering works consistently.
- This app currently has no authentication — all expenses are visible and editable by anyone with access to the deployment. Add an auth layer (e.g. [Clerk](https://clerk.com), [NextAuth](https://authjs.dev)) before deploying anywhere public.

## License

MIT

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
