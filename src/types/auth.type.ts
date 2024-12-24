export type AuthInfo = {
  result: {
    access_token: string
  }
}

export type SignInDto = {
  email: string
  password: string
}
