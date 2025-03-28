declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      DB_URI: string;
      APP_DEBUG: string;
    }
  }
}

export {}
