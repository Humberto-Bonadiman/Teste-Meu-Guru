const appJson: string = 'application/json';
const PORT: string = '3001';
const URL: string = 'localhost';

export const fetchDelete = async (id: number) => {
  const deleteUser = fetch(`http://${URL}:${PORT}/:${id}`, {
    method: 'DELETE',
    headers: {
      Accept: appJson,
      'Content-Type': appJson
    }
  });

  const response = await deleteUser;
  return response;
};
