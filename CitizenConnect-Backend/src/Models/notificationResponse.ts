export interface NotificationResponse {
    user: {
        userId: string;
        userName: string;
        roleName: string;
    }
    
    requestedAt: string
}