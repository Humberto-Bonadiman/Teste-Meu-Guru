const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export interface UserI {
  name: string,
  email: string,
  password: string,
}

export const updateFetch = async (id: number, user: UserI) => {
  const { name, email, password } = user;
  const updateUser = fetch(`http://${URL}:${PORT}/:${id}`, {
    method: 'PUT',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const response = await updateUser;
  return response;
};
