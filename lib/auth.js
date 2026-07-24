export function loginUser(user) {
  localStorage.setItem("login", "true");
  localStorage.setItem("user", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("login");
  localStorage.removeItem("user");
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("login") === "true";
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("user");

  return data ? JSON.parse(data) : null;
}