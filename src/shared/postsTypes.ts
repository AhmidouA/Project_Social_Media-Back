export type PostType = {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    location?: string;
    description?: string;
    picturePath?: string;
    userPicturePath?: string;
    likes: []; 
    friends: string[];
    created_at: Date;
    updatedAt: Date;
};

export type createPostType = {
    userId: number;
    description?: string;
    picturePath?: string;
}