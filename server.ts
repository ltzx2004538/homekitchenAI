import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import { connectDB } from './DA/db';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server is running.' });
});

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
