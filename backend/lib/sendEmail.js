import axios from 'axios';

const sendMail = async ({ to, subject, html, text }) => {
  const response = await axios.post(
    'https://mailserver.automationlounge.com/api/v1/messages/send',
    { to, subject, html, text },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_MAIL_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export default sendMail;