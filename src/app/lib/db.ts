import mongoose from 'mongoose';


const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const mongooseOptions: mongoose.ConnectOptions = {
  dbName: "sat",
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {

  let globalWithMongoose = global as typeof globalThis & {
    _mongooseClientPromise?: Promise<typeof mongoose>
  };

  if (!globalWithMongoose._mongooseClientPromise) {
    globalWithMongoose._mongooseClientPromise = mongoose.connect(uri, mongooseOptions);
  }
  clientPromise = globalWithMongoose._mongooseClientPromise;
} else {

  clientPromise = mongoose.connect(uri, mongooseOptions);
}

export default clientPromise as Promise<typeof mongoose>;
