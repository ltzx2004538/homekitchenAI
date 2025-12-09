import 'express-session';

// Extend express-session types to include user

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      [key: string]: any;
    };
  }
}
