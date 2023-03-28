const redirectUrl = () => {
  return `http://127.0.0.1:8000/oauth2/authorize?response_type=code&client_id=ultimate_digital_labs&redirect_uri=http://127.0.0.1:4200/authorized&scope=openid read`;
};

export default redirectUrl;
