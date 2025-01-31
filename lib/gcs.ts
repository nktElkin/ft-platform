import { Storage } from '@google-cloud/storage';
import path from 'path';

// Path to your GCS key file
const keyFilePath = path.join(process.cwd(), './secret/gcs-key.json');

// Initialize GCS client
const storage = new Storage({
  keyFilename: keyFilePath,
});

const bucketName = 'mediastorage-buck'; // Replace with your bucket name

// Upload a file to GCS
export const uploadFile = async (fileBuffer: Buffer, fileName: string) => {
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(fileName);

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.end(fileBuffer);

  return new Promise((resolve, reject) => {
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.on('error', (err) => {
      reject(err);
    });
  });
};

// Download a file from GCS
export const downloadFile = async (fileName: string) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2025', // Set an expiration date
  });

  return url;
};



export const deleteObject = async (objectName: string) => {
  try {
    const bucket = storage.bucket(bucketName);
    await bucket.file(objectName).delete();
    console.log(`gs://${bucketName}/${objectName} deleted.`);
    return true;
  } catch (error) {
    console.log('[LIB/GCS-DELETE]', error);
    return false;
  }
};
