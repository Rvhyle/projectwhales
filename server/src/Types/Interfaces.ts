interface IUserInfo {
  id?: String | null;
  username?: String | null;
  password?: String | null;
  email?: String | null;
  name?: String | null;
}

//Session Data Interface
declare module 'express-session' {
  export interface SessionData {
    user_id: string;
  }
}

export { IUserInfo };
