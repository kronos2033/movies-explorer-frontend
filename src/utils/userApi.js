export const BASE_URL = "http://api.movie.diplom.nomoredomains.club/";
const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

export const autorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
}

export const updateUserInfo = (name, email) => {
return fetch (`${BASE_URL}users/me`,{
  method: "PATCH",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
  body: JSON.stringify({ name, email }),
})
.then(checkResponse);
}
