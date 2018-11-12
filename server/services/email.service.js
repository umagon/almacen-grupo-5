var nodemailer = require('nodemailer');

var service = {};
service.enviarMail = enviarMail;

module.exports = service;

async function enviarMail(destino) {
  try {
    // Generate SMTP service account from ethereal.email
    let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
      },
      {
        // default message fields

        // sender info
        from: 'Test Almacen'
      }
    );

    // Message object
    let message = {
      // Comma separated list of recipients
      to: destino,

      // Subject of the message
      subject: 'Solicitud de stock',

      // plaintext body
      text: 'Se desea reponer el stock del produto.'
    };

    let info = await transporter.sendMail(message);

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));

    // only needed when using pooled connections
    transporter.close();
  } catch (ex) {
    console.log('Error al enviar email: ' + ex);
  }
}
