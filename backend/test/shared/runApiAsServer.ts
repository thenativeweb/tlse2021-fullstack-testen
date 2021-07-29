import { Application } from 'express';
import http from 'http';
import os from 'os';
import path from 'path';
import { v4 } from 'uuid';
import axios, { AxiosInstance } from 'axios';

const runApiAsServer = async function ({ api }: {
  api: Application;
}): Promise<{ client: AxiosInstance; socket: string }> {
  const server = http.createServer(api);

  const socket = path.join(os.tmpdir(), `${v4()}.socket`);

  await new Promise<void>((resolve, reject): void => {
    server.listen(socket, (): void => {
      resolve();
    });

    server.on('error', (err): void => {
      reject(err);
    });
  });

  const axiosInstance = axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: `http://localhost`,
    socketPath: socket
  });

  return { client: axiosInstance, socket };
};

export { runApiAsServer };
