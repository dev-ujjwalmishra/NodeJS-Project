const sendMail = () => {
    const nodemailer  = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'victoria.marquardt@ethereal.email',
            pass: 'E123mv7AyFStjXhQcG'
        }
    });

    async function main() {
        const info = await transporter.sendMail({
            from: "'Ujjwal Mishra' <ujjwalmishra@gmail.com>",
            to: "victoria.marquardt@ethereal.email",
            subject: "Hello",
            text: "Hi there, it's Ujjwal Mishra from Sisco InfoTech. It's a simple mail for testing purpose.",
            html: "<b>Hello bro</b>"
        });

        console.log("Message send : %s",info.messageId);
    }
    main().catch(console.error);

}


module.exports = sendMail;