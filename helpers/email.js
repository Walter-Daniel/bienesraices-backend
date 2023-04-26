const nodemailer = require('nodemailer');

const emailRegister = async({ name, email, token }) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      //Enviar email
      await transport.sendMail({
        from: 'Bienes Raices',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text: 'Confirma tu cuenta en Bienes Raices',
        html: `
        <h1>Bienes Raices</h1>
        <br />
        <p>Hola ${name}!. Comprueba tu cuenta en Bienes Raices</p>

        <p>Tu cuenta ya se encuentra lista, sólo debes confirmarla en el siguiente enlace
        <a href='${process.env.FRONTEND_URL}/auth/confirm/${token}'>Confirmar Cuenta</a>
        </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
      })
};

const sendEmailResetPassword = async({ name, email, token }) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    //Enviar email
    await transport.sendMail({
      from: 'Bienes Raices',
      to: email,
      subject: 'Reestablece tu password en Bienes Raices',
      text: 'Reestablece tu password en Bienes Raices',
      html: `
      <h1>Bienes Raices</h1>
      <br />
      <p>Hola ${name}!. Has solicitado reestablecer tu password en Bienes Raices</p>

      <p>Haz clic en el siguiente enlace para recuperar tu contraseña
        <a href='${process.env.FRONTEND_URL}/auth/recoverPassword/${token}'>Recuperar contraseña</a>
      </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      
      `
    })
};

module.exports = {
    emailRegister,
    sendEmailResetPassword
}