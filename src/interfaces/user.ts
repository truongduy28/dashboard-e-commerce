export interface AuthResponse {
    message: string;
    data: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        _id: string;
        __v: number;
        token: string;
    };
}
