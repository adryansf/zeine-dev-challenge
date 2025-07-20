import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

// Types
interface ISuccess<T = null> {
  ok: true;
  data: T;
}

interface IError {
  ok: false;
  statusCode: number;
  error: string;
  message: string;
}

type EndpointResponse<T = null> = ISuccess<T> | IError;

// Main
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function uploadProfilePhoto({
  file,
}: {
  file: File;
}): Promise<EndpointResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    await api.patch("/users/photo/upload", formData);

    return {
      ok: true,
      data: null,
    };
  } catch (e) {
    const err = e as unknown as AxiosError<Omit<IError, "ok">>;
    return {
      ok: false,
      statusCode: err.response?.data.statusCode || 500,
      error: err.response?.data.error || "",
      message: err.response?.data.message || "",
    };
  }
}
