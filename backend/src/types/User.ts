export type UserWithBranch = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  branch: {
    id: string;
    name: string;
  };
};
