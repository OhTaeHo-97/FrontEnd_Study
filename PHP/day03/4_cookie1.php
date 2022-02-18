<?php
    setcookie("snack", "cookie", time() + (60 * 60 * 24), "/"); // time() - 현재 시간을 의미, 유효시간: 60 * 3 -> 3분
    // setcookie 이용해서 쿠키 생성
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>쿠키</title>
</head>
<body>
    <h2>쿠키 만들기</h2>
</body>
</html>