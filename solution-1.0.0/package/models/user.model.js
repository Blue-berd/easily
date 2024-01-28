let users = [
  { id: 1, name: "jay", email: "sardar@gmail.com", password: "jay@12345", recruiter: true },
];
export const getUsers = () => users;

export const handleSingUpModel = (user) => {
  let id = users.length + 1;
  users.push({ ...user, id: id });
};
export const handleLoginModel = (user) => {
  return users.some(
    (userData) =>
      userData.email === user.email && userData.password === user.password
  );
};
export const findUser = (email) => {
  return users.find((user) => user.email == email);
};
export const isLoggedIn = (request) => {
  return request.session.userEmail ? true : false;
};
