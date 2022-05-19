const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchUsers = async (page: number) => {
  const fetchPageUsers = fetch(`http://${URL}:${PORT}/user/search/${page}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });

  const response = await fetchPageUsers;
  return response;
};

export const fetchAllUsers = async () => {
  const fetchAllUsers = fetch(`http://${URL}:${PORT}/user`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });

  const response = await fetchAllUsers;
  return response;
};

export const fetchOneUser = async (email: string, name: string) => {
  const fetchUser = fetch(`http://${URL}:${PORT}/user/specific`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      email,
      name,
    }),
  });

  const response = await fetchUser;
  return response;
};
