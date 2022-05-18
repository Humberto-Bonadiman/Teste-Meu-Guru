const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchPost = async (email: string, password: string) => {
  const fetchUser = fetch(`http://${URL}:${PORT}/user`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const response = await fetchUser;
  return response;
};
