export interface RegisterResponse {
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
