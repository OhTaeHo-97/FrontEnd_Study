const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhxogh125@gmail.com',
        pass: 'dPflstkfkd12!'
    },
    host: 'smtp.mail.com',
    port: '465'
})

const mailOption = {
    from: '오태호<dhxogh125@gmail.com>',
    to: '오태호<dhxogh123123@naver.com>, 오태호<dhxogh125@daum.net>',
    subject: 'node.js로 보내는 첨부메일',
    // text: '안녕하세요. node.js로 보내는 메일입니다.'
    html: '<h2>안녕하세요. node.js로 보내는 첨부메일입니다.</h2><p style = "font-size: 15px; color: deeppink;">파일이 잘 저장되었나요?</p>',
    attachments: [
        {
            filename: "소중한메모장.txt",
            path:"day07.txt"
        }
    ]
} // 메일을 보낼 때 attachment로 첨부를 하나 해서 보내는데 파일은 path에 있는 day07.txt로 파일 이름은 소중한메모장.txt로 보내짐

transport.sendMail(mailOption, (err, info) => {
    if(err) {
        console.log(err);
    } else {
        console.log(info);
    }
    transport.close(); // sendMail을 하고 transport를 닫아줌
});