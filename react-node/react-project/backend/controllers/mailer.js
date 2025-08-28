// controllers/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function enviarCorreoBienvenida(destinatario) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: '¡Bienvenido a la plataforma!',
    html: `<h3>Gracias por registrarte.</h3><h2> Bienvenido al proyecto de react de SELV.</h2><p>Muchas gracias por apoyar este proyecto</p>`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreoBienvenida };
