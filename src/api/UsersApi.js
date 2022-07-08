const baseUrl = "https://jsonplaceholder.typicode.com/users";

// POST
export const CreateUser = async (body) => {
  return await fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

// DELETE
export const DeleteUser = async (id) => {
  return await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

// PUT
export const EditUser = async (body) => {
  return await fetch(`${baseUrl}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};




