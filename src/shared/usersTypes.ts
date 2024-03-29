import { PostType } from "./postsTypes";

export type createUserType = {
    firstName: string;
    lastName: string;
    email: string;
    picturePath?: string;
    password: string;
    confirmPassword?: string;
    friends: string[];
    location?: string;
    occupation?: string;
    viewedProfile?: number;
    impressions?: number;
    posts?: PostType[];
    created_at: Date;
    updatedAt: Date;
}

export type ReadUserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picturePath?: string;
  password: string;
  friends: string[];
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
  posts?: PostType[];
  created_at: Date;
  updatedAt: Date;
};

export type loginType = {
  email: string;
  password: string;
};

export type friendsType = {
  id: number;
  firstName: string;
  lastName: string;
  location?: string;
  occupation?: string;
  picturePath?: string;
}