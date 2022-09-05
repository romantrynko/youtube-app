import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = "mongodb+srv://trynkoroman:trynkoroman30@nextjscrud.db2uqn7.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      family: 4,
    });
    logger.info("Connect to database");
  } catch (e) {
    logger.error(e, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();

  logger.info("Disconnect from database");

  return;
}