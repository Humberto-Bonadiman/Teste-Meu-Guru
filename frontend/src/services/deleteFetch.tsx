const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchDelete = async (id: number) => {
  const deleteUser = fetch(`http://${URL}:${PORT}/:${id}`, {
    method: 'DELETE',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
  });

  const response = await deleteUser;
  return response;
};
