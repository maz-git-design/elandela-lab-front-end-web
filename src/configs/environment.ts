const baseUrl = "http://localhost:4200";
const liveUrl = `https://redmine.alpha.aenigm.com/api`;
const localUrl = "https://localhost:3001/api";
const liveSocketUrl = "https://redmine.alpha.aenigm.com";
const localSocketUrl = "http://localhost:3000";

export const environment = {
  baseUrl,
  mainServiceUrl: localUrl,
  socketUrl: liveSocketUrl,
  production: false
};
