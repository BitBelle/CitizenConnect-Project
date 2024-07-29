export interface Views {
    viewId: string
    userId: string
    userName:string
    userImg?:string
    viewContent: string
    createdAt: string
}

export interface AddView {
    userId: string
    userName:string
    viewContent: string
}

export interface AddViewResponse {
    message: string
}

export interface UpdateViewResponse {
    message: string
}

export interface DeleteViewResponse {
    message: string
}

export interface viewRequest {
    viewContent: string
}


export interface viewResponse {
    message: string
}