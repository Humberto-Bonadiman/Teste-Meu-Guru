const appJson = 'application/json';
const PORT = '3001';
const URL = 'localhost';

export const fetchUsers = async (page: number) => {
  const fetchPageUsers = fetch(`http://${URL}:${PORT}/user/search/${page}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    }
  });

  const response = await fetchPageUsers;
  return response;
};

export const fetchAllUsers = async () => {
  const fetchAllUsers = fetch(`http://${URL}:${PORT}/user`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    }
  });

  const response = await fetchAllUsers;
  return response;
};

export const fetchOneUser = async (email: string, name: string) => {
  const fetchUser = fetch(`http://${URL}:${PORT}/user/specific`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    },
    body: JSON.stringify({
      email,
      name
    })
  });

  const response = await fetchUser;
  return response;
};
