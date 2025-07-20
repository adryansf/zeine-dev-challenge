import * as Minio from "minio";

// Libs
import { generateObjectName } from "../lib/utils.ts";

const ENDPOINT = process.env.MINIO_ENDPOINT!;
const PORT = Number(process.env.MINIO_PORT)!;
const ACCESS_KEY = process.env.MINIO_ACCESS_KEY!;
const SECRET_KEY = process.env.MINIO_SECRET_KEY!;
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME!;

if (!ENDPOINT || !PORT || !ACCESS_KEY || !SECRET_KEY) {
  throw new Error("MINIO VARIABLES are incorrect.");
}

const [PROTOCOL, HOST] = ENDPOINT.split("://");

// Types
interface IRemoveObjectParams {
  name: string;
}

interface IUploadObjectParams {
  originalName: string;
  object: Buffer;
}

//
const minioClient = new Minio.Client({
  endPoint: HOST,
  port: PORT,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
  useSSL: PROTOCOL === "https" ? true : false,
});

export function removeObject({ name }: IRemoveObjectParams) {
  try {
    return minioClient.removeObject(BUCKET_NAME, name);
  } catch (err) {
    return;
  }
}

export async function uploadObject({
  originalName,
  object,
}: IUploadObjectParams): Promise<{ url: string; objectName: string }> {
  const objectName = generateObjectName({ originalName });

  await minioClient.putObject(BUCKET_NAME, objectName, object);

  return {
    url: `${PROTOCOL}://${HOST}/${BUCKET_NAME}/${objectName}`,
    objectName,
  };
}
