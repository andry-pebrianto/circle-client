export type RegisterType = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginType = {
  emailOrUsername: string;
  password: string;
};

export type ThreadLikeType = {
  id: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
};

export type ThreadReplyType = {
  id: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type ThreadHomeType = {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
  likes: ThreadLikeType[];
  replies: number;
};

export type ThreadDetailType = {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
  likes: ThreadLikeType[];
  replies: ThreadReplyType[];
};

export type ThreadPostType = {
  content: string;
  image?: string;
};
