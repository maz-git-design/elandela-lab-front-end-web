const baseUrl = window.location.origin;

export const environment = {
  baseUrl,
  mainServiceUrl: `${baseUrl}/api`,
  socketUrl: `${baseUrl}`,
  production: true
};
