export interface AuthResponse {
    message: string;
    data: {
        name: string;
        email: string;
        photoUrl: string;
        createdAt: string;
        updatedAt: string;
        _id: string;
        __v: number;
        token: string;
    };
}
