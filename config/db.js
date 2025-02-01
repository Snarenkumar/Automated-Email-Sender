import mysql from 'mysql2';

export const connectDB = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect(err => {
    if (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    console.log('MySQL Connected');
  });

  return db;
};

export default connectDB;
