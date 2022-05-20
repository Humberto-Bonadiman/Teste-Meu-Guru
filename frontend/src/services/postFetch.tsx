const appJson: string = 'application/json';
const PORT: string = '3001';
const URL: string = 'localhost';

export const fetchPost = async (email: string, password: string) => {
  const fetchUser = fetch(`http://${URL}:${PORT}/user`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const response = await fetchUser;
  return response;
};
