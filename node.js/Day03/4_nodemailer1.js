const nm = require('nodemailer');
const transport = nm.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhxogh125@gmail.com',
        pass: 'dPflstkfkd12!'
    },
    host: 'smtp.mail.com',
    port: '465'
}); // () 안에 객체로서 설정해서 넘겨주면 됨

const mailOption = {
    from: '오태호<dhxogh125@gmail.com>',
    to: '오태호<dhxogh123123@naver.com>',
    subject: 'node.js로 보내는 메일',
    // text: '안녕하세요. node.js로 보내는 메일입니다.'
    html: '<h2>안녕하세요. node.js로 보내는 메일입니다.</h2><p style = "font-size: 15px; color: deeppink;">정말 잘 가나요????</p>'
}; // 어떤 메일을 보낼 것인지 옵션에 대한 객체

transport.sendMail(mailOption, (err, info) => {
    if(err) {
        console.log(err);
    } else {
        console.log(info);
    }
    transport.close(); // sendMail을 하고 transport를 닫아줌
});