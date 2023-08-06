// mock login and logout
export function login(email: string) {
  // add cookie
  document.cookie = "swr-test-token=swr;";
  document.cookie = `email=${email}`;
}
export function logout() {
  // delete cookie
  document.cookie = "swr-test-token=;";
  document.cookie = "email=;";
  document.cookie = "expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
