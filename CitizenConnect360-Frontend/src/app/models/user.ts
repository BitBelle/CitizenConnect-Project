export interface User {
  userId: string
  userName: string
  upassword: string
  userEmail: string
  roleName: string
  // userStatus:string
  violatedTerms: boolean;
  termsAccepted: boolean;

}



export interface SignUpResponse {
  message: string
}

export interface LoginUser {
  userEmail: string
  upassword: string

}


// export interface LogInResponse{
//   payload: any
//   roleName: string
//   message: string,
//   token:string

// }

export interface LogInResponse {
  token: string;
  message: string;
  payload: {
    [x: string]: any
    Sub: string
    userName: string
    roleName: string
  };
}


export interface Payload {
  [x: string]: any
  Sub: string
  userName: string
  roleName: string
}

export interface PasswordResetResponse {
  token: string;
  message: string;
  userEmail:string
}