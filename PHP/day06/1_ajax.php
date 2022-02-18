<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajax</title>
</head>
<body>
    <h2>Ajax</h2>
    <p id="text"></p>
    <p><input type="text" id="userid"></p>
    <p><input type="password" id="userpw"></p>
    <p>
        <input type="button" value="요청 보내기(GET)" onclick = "sendit_get()">
        <input type="button" value="요청 보내기(POST)" onclick = "sendit_post()">
    </p>
</body>
<script>
    // GET 방식
    function sendit_get() {
        // Ajax -> 별개의 통신을 (?) 하는 것이기 때문에 xhr을 새로 만들어야 함
        const xhr = new XMLHttpRequest();
        // 통신할 때마다 readyState이 바뀌게 될 것이고 바뀔 때마다 onreadystatechnage가 불림
        xhr.onreadystatechange = function() {
            // console.log("함수 호출!")
            // 버튼을 누르면 여기로 요청을 보낼 것이고 (?)
            // console.log()로 함수 호출을 찍었었는데(매번 statechange (?) 찍혔고)
            // readyState가 변할 때마다 찍히는 것이 맞는데 (?)
            // 통신이 완벽히 마무리 됐는지 물어봄
            // onreadystatechange에 보내는 (?) readyState라는 것이 바뀌면 자동으로 호출됨
            // 그러니까 통신할 때마다 5번씩 호출됨
            // 5번 호출될 동안 unset단계에서 결과를 얻어오려고 하면 안됨
            // 결과를 얻어올 때는 다 완료되었을 때, 즉 DONE일 때임
            // 따라서 함수가 매번 호출되는 것은 맞지만 내부에서 DONE일 때만 결과를 확인하면 된다!
            if(xhr.readyState == XMLHttpRequest.DONE) {
                // readyState는 통신의 상태(길이 잘 만들어졌는지 내가 요청을 잘 보냈는지 (?) 등에 대한 것)
                // 내가 요청보내는 ok.php가 없다면 통신 실패는 아님
                // 정상적으로 요청을 보냈는지 확인해봤을 때 요청을 잘 보냈을 것임, 그런데 그 페이지가 없으니 서버는 아무것도 돌려줄 수 없다는 응답으로 page no found를 보여줌
                // 요청을 제대로 보냈고 통신도 헀지만 정상적인 결과는 아니다라는 응답을 해준 것(?>)
                // readyState는 지금 통신의 상태가 어떠한지를 보는 것
                // XMLHttpRequest가 DONE이면 통신은 잘된 것
                // 그런데 성공인지 실패인지는 모르니 내부에서 확인해주는 것(서버 오류 - 500, 성공 = 200 or 201, 페이지가 없음 - 400)
                if(xhr.status == 200) { // 잘 완료됐는지
                // 여기까지 들어온 것은통신은 잘 완료되었으며 결과도 잘 가져왔다라는 뜻
                    document.getElementById("text").innerHTML = xhr.responseText; // 응답 텍스트를 확인해볼 것임
                    // ok.php에서 echo로 찍은 것이 통째로 responseText임(echo로 찍어내는 것이 응답임)
                    // 통신 성공했으면 apple과 1111이 br로 연결된 채 찍힐 것임
                    
                }
            }
        }

        let userid = document.getElementById("userid").value;
        let userpw = document.getElementById("userpw").value;

        // 어디로 요청을 보낼지 길을 열어줄 것임
        // open 함수는 첫 번째 매개 변수에 내가 무슨 방식으로 요청을 보낼 것인지(GET / POST), 두 번째 매개변수로는 어디에 보낼 것인지, 마지막에는 true
        // open() -> 내가 어느 쪽으로 요청을 보낼 것인지에 대한 길을 열어주는 것
        xhr.open("GET", `1_ajax_ok.php?userid=${userid}&userpw=${userpw}`, true);
        // 실제로 요청 보내기
        // send9) -> open() 해놓은 곳으로 요청을 보내줄 것임
        // (?) onreadystatechage가 불릴 것임
        xhr.send();

        // (?) 정해놓은 함수가 open할 때, send할 때 수행이 됨
        // onclick도 마찬가지로 sendit 해놓으면 클릭을 해야 호출되는 것처럼
        // readystate가 변화되어야 onreadystatechange 함수를 호출(?)
        // 응답을 text로 받은 것(?) HTML 파일에서 text만 받아오는 것(문자열로)(responseText)
        // apple<br>1111<br> 이렇게 생긴 텍스트를 받아올 것임
        // 그것을 innerHTML에 넣어놓으니까 apple엔터1111엔터 이렇게 되는 것임
        // echo를 해놨기 때문에 이렇게 responseText를 받는 것
        // responseText를 받아서 JSON을 넘겨줬다면 JSON 형태를 해석해서 써야 함
        // 그래서 결국 responseText 형태로 사용함
    }
    function sendit_post() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                if(xhr.status == 200) {
                    document.getElementById("text").innerHTML = xhr.responseText;
                }
            }
        }
                
        xhr.open("POST", "1_ajax_ok.php", true);
        // POST로 보낼 때는 이를 써줘야 함
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let userid = document.getElementById("userid").value;
        let userpw = document.getElementById("userpw").value;
        // 데이터 보내기
        // send 메서드 내에 매개변수로 보내줌
        xhr.send(`userid=${userid}&userpw=${userpw}`);
    }
</script>
</html>