<?php
    // 쿠키 지울 때도 setcookie를 사용
    setcookie("snack", "cookie", time() - (60*60*24), "/"); // 만료시간을 현재보다 과거로 함
    // key-value -> 똑같은 key값에 새로운 데이터가 나오면 기존에 있던 것이 새로운 데이터로 바뀜
    // 유효기간이 과거니까 만드는 순간 만료시간이 지나있어 바로 없어짐
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>쿠키 지우기</title>
</head>
<body>
    <h2>쿠키 지우기</h2>
</body>
</html>