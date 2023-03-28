const tokenUrl = (code: string) => {
  const redirectUrl = `http://127.0.0.1:4200/authorized&code=${code}`;
  return `http://localhost:8000/oauth2/token?&grant_type=authorization_code&redirect_uri=${redirectUrl}`;
};

export default tokenUrl;
