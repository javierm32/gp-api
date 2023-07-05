import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseUrl: process.env.DATABASE_URL,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsBucketRegion: process.env.AWS_BUCKET_REGION,
    awsPublicKey: process.env.AWS_PUBLIC_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
  };
});
