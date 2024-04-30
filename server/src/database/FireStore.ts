// const Firestore = require('@google-cloud/firestore');
// import * as geofire from 'geofire');
// import { Location } from '../types/types';

// const db = new Firestore({
//   projectId: process.env.GOOGLE_PROJECT_ID,
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });

// export const toTimestamp = (date: Date) => {
//   return Firestore.Timestamp.fromDate(date);
// }

// export const toLocation = (location: Location) => {
//   return Geofire.geohashForL
// }

// export default db;

// const Firestore = require('@google-cloud/firestore');
import FirebaseFirestore from '@google-cloud/firestore';

const db = new FirebaseFirestore.Firestore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const toTimestamp = (date: Date) => {
  return FirebaseFirestore.Timestamp.fromDate(date);
}

export const fromTimestamp = (time: FirebaseFirestore.Timestamp) => {
  return time.toDate();
}

export default db;