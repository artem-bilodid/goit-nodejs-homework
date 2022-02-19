const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, SENDGRID_EMAIL_ACCOUNT } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendUserConfiramtion = async (email, validationToken) => {
  const msg = {
    to: email,
    from: SENDGRID_EMAIL_ACCOUNT,
    subject: 'Contacts App: Account verification email',
    text: `To confirm your account please follow the Link: http://localhost:3000/api/users/verify/${validationToken}`,
    html: `To confirm your account please follow the <a href="http://localhost:3000/api/users/verify/${validationToken}">Link</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendUserConfiramtion;
