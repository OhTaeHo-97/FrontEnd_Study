const sendit = function() {
    // form을 제출하려 할 때 호출되어야 함
    // 문제가 있으면 백단으로 제출되기 전에 막고 정상적이라면 넘어가게 하는 것
    
    // return true 하는 경우와 return false로 하는 경우로 나눌 것임
    // 제출될 때 이 함수를 호출하고 true를 return하면 정상적으로 제출
    // form을 제출할 때 이 함수를 호출했는데 false를 return했으면 그 페이지에 그대로 머무르고 제출되게 하지 않음

    alert("sendit 호출!");
    // return true; // 모든 입력이 정상적으로 되었으므로 정상적으로 폼을 제출
    // return false; // 입력에 오류가 생겼으므로 폼을 제출하지 않음

    const userid = document.regform.userid; // input 태그 하나가 찾아질 것임(userid라는)(document에서 regform(form 이름) 찾아서 그 안에 있는 userid 찾은 것)(문서에서 form 이름으로 form 접근 가능! -> 그 안에 있는 userid)
    if(userid.value == '') { // 아이디 적혀있는지 확인
        alert("아이디를 입력하세요!");
        userid.focus(); // 커서가 해당 userid로 이동됨!(바로 쓰기만 하면 됨)
        return false; // return 만나면 함수 아래 부분 안함(호출하는 곳으로 돌아감) -> 제출이 막히고 멈춤
    }
    if(userid.value.length < 5 || userid.value.length > 12) { // 아이디 길이 검사
        alert("아이디는 5자 이상 12자 이하로 입력하세요!");
        userid.focus();
        return false;
    }
    
    const userpw = document.regform.userpw;
    const userpw_re = document.regform.userpw_re;
    if(userpw.value == '') {
        alert("비밀번호를 입력하세요!");
        userpw.focus();
        return false;
    }
    if(userpw.value.length < 6 && userpw.value.length > 20) {
        alert("비밀번호는 6자 이상 20자 이하로 입력하세요!");
        userpw.focus();
        return false;
    }
    if(userpw_re.value == '') {
        alert("비밀번호 확인을 해주세요!");
        userpw_re.focus();
        return false;
    }
    if(userpw.value != userpw_re.value) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
        userpw.focus();
        return false;
    }

    const name = document.getElementById("username");
    // 정규식 -> 어떤 특정화된 문자들의 조합으로 문자열의 형식을 확인할 수 있는 문법(특징 및 규칙이 있음)
    // 가 ~ 힣까지 모든 문자를 반복하면서 있는지 확인해야 하기 때문에 복잡함(경우의 수가 너무 많음)
    // RegExp -> 정규식이라는 뜻(Exp가 정규식이라는 곳에 많이 사용됨)
    const expNameText = /[가-힣] + $/; // /[]/ 이렇게 하면 문자열이 됨(대괄호 -> 안에 두 개의 문자를 -로 연결해주면 그것부터 여기까지라는 범위를 정해줌(가가 한글에서 처음 있는 글자, 힣이 마지막 글자이니 모든 한글을 뜻함), 글자 + -> 앞에 있는 글자가 반복된다는 뜻(한 번 이상)(한글로만 이루어진 글자들을 찾겠다는 뜻), $ -> 종료된다는 뜻)(한글에 있는 모든 글자 중 하나가 여러 번 반복되고 그것으로 종료된다는 뜻!)(+ -> 앞에 있는 글자가 반복된다는 뜻(한 번 이상(한 글자 또는 여러 글자가 다 앞에 있는 글자로 반복된다는 뜻)), 한글 중 있던 어떤 글자가 여러번 반복됨, $ -> 그것으로 끝난다라는 뜻(한글로 끝난다라는 뜻))
    // 한글로만 이루어진 글자임을 말함
    // 정규식 이용해서 검사할 수 있음! -> test 함수 이용
    if(!expNameText.test(name.value)) { // name의 값이 정규식에 일치한다면 true가 됨
        alert("이름 형식을 확인하세요! 한글만 입력하세요!");
        name.focus();
        return false;
    }

    const hp = document.getElementById("hp");
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/; // ^ 뒤에 문자가 있다면 그것으로 시작한다는 뜻(\ -> 뒤에 것과 합쳐져서 하나의 문자를 의미)
    // ^는 뒤에 있는 것으로 시작하는데 \d{3}으로 시작한다는 뜻
    // \d => 숫자라는 뜻, {3} -> 앞에 있는 것이 3번 나온다는 뜻
    // {3,4} -> 3번 이상 4번 이하
    if(expHpText.test(hp.value)) {
        alert("휴대폰번호 형식을 확인하세요!");
        hp.focus();
        return false;
    }

    const email = document.regform.email;
    const expEmailText = /^[A-Za-z0-9\.\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/; // . -를 문자로 쓰려면 \를 넣어줘야 함
    if(expEmailText.test(email.value)) {
        alert("이메일 형식을 확인하세요!");
        email.focus();
        return false;
    }

    const hobbies = document.regform.hobby; // checkbox 버튼들이 담겨있는 배열임!
    let flag = false;
    for(let i = 0; i < hobbies.length; i++) {
        if(hobbies[i].checked) { // checkbox가 check되면 그 요소에 checked라는 속성이 true로 바뀜(한 번이라도 check된 것이 있으면 if문을 들어올 것임), 한 번도 안 들어왔으면 체크가 하나도 하나도 안된 것
            flag = true;
            break;
        }
    }
    if(!flag) {
        alert("취미는 적어도 1개 이상 선택하세요!");
        return false;
    }

    const zipcode = document.regform.zipcode;
    if(zipcode.value == '') {
        alert("주소를 입력하세요!");
        sample6_execDaumPostcode();
        return false;
    }

    const address2 = document.regform.address2;
    if(address2.value == '') {
        alert("상세주소를 입력하세요!");
        address2.focus();
        return false;
    }

    return true;
}
// window.onload = function() {
//     const hobby = document.regform.hobby;
//     console.log(hobby);
// }