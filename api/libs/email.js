const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
//comments
exports.sendMail = async function (email, Subject, HtmlBody, TextBody) {
    await client.sendEmail({
        "From": process.env.POSTMARK_FROM,
        "To": email,
        "Subject": Subject,
        "HtmlBody": HtmlBody,
        "TextBody": TextBody,
    });
}


exports.emailProvider = client;