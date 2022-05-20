const appJson: string = 'application/json';
const PORT: string = '3001';
const URL: string = 'localhost';

export interface UserI {
  name: string;
  email: string;
  password: string;
}

export const updateFetch = async (id: number, user: UserI) => {
  const { name, email, password } = user;
  const updateUser = fetch(`http://${URL}:${PORT}/:${id}`, {
    method: 'PUT',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  const response = await updateUser;
  return response;
};
