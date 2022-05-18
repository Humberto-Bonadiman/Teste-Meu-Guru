const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchUsers = async (id: number) => {
  const fetchAll = fetch(`http://${URL}:${PORT}/user/search/${id}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });

  const response = await fetchAll;
  console.log(response);
  return response;
};

export const fetchOneUser = async (email: string, password: string) => {
  const fetchUser = fetch(`http://${URL}:${PORT}/user/specific`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });

  const response = await fetchUser;
  return response;
};
