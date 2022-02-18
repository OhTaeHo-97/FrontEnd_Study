<?php
    // 이 페이지에 접속했을 때 session을 쓸것인지 말것인지 먼저 설정해줘야 함
    session_start(); // 이것을 써줘야지만 그 다음부터 session을 쓸 수 있음
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>세션 - 2</title>
</head>
<body>
    <h2>세션 - 2</h2>
    <p>세션ID : <?=session_id()?></p>
    <!-- session_id() 통해 session id를 가져올 수 있음 -->
    <!-- userid에 apple, username에 김사과 넣어놓음, (?) 어떤 session의 특정 공간에
    다음 번에 서핑할 때 session이 필요한 곳에 왔으면 아까 저장했던 것을 찾아와야 함 -> 찾아오기 위한 아이디가 session_id() -->
    <p>USERID 변수 : <?= $_SESSION['userid'] ?></p>
    <p>USERNAME 변수 : <?= $_SESSION['username'] ?></p>
</body>
</html>