export type PostType = {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    location?: string;
    description?: string;
    picturePath?: string;
    userPicturePath?: string;
    likes: any; // Remplacez "any" par le type approprié pour vos likes
    friends: string[];
    created_at: Date;
    updatedAt: Date;
};

export type createPostType = {
    userId: number;
    description?: string;
    picturePath?: string;
}