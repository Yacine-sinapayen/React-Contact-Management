const baseUrl = "https://jsonplaceholder.typicode.com/users";

// DELETE
export const DeleteUser = async (id) => {
  return await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

// POST

// PUT
