import helmet from 'helmet';
import { CORS_ORIGIN } from './constants';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';
import userRoute from './modules/user/user.route';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());

app.use('/api/users', userRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listetning at http://localhost:${PORT}`)
});

const signals = ["SIGTERM", "SIGINT"]

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info('Goodbye, got signal', signal);
    server.close();

    // disconnect from the db
    await disconnectFromDatabase();

    logger.info('My work is done');

    process.exit(0)
  })
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i])
}