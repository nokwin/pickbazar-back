module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '705624bcd420cd2f44d1cbb83ec3fdf8'),
    },
  },
  url: env('', 'https://20daa52f6c89.ngrok.io')
});
