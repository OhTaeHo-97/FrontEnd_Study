<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
</head>
<body>
    <h2>로그인</h2>
    <?php
        if(!isset($_SESSION['userid'])) {
    ?>
    <form action="9_login_ok.php" method = "POST">
        <p>아이디 : <input type="text" name="userid" id=""></p>
        <p>비밀번호 : <input type="password" name="userpw" id=""></p>
        <p><input type="submit" value="로그인"></p>
    </form>
    <?php
        } else {
    ?>
    <p><?= $_SESSION['userid'] ?>님 환영합니다!</p>
    <p><a href="9_logout_ok.php">로그아웃</a></p>
    <?php
        }
    ?>
    <!-- 로그인이 되었으면 session에 세팅되어있을 것임, 로그인이 되지 않았으면 session이 세팅된 것이 없을 것임 -->
</body>
</html>