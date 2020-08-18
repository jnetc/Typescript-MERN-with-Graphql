import mongoose from 'mongoose';

// Это рабочий паттерн mongodb
// ВНИМАНИЕ!!!
// Нужно указывать базу данных в конце обязательно
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@nodejs-eg0pt.mongodb.net/db-trade-house`;

const connect = async (): Promise<typeof mongoose | undefined> => {
  try {
    return await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(`Connection is failed! ${error}`);
  }
};

export default connect();
