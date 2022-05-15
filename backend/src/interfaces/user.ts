export interface UserI {
  name: string,
  email: string,
  password: string,
}

export interface UserIdI extends UserI {
  id: number,
}
