// MAKE `.env` file contain all this values

export const configuration = () => ({
  name: process.env.NAME || 'chess',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 5000,
  database: process.env.MONGODB_URI,
});

export type AppConfiguration = ReturnType<typeof configuration>;
