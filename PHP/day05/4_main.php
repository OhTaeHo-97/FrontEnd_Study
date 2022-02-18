<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP 게시판</title>
</head>
<body>
    <h2>PHP 게시판</h2>
    <?php
        if(!isset($_SESSION['userid'])) {
    ?>
        <script>
            alert("로그인 후 이용하세요!");
            location.href = "./3_login.php";
        </script>
    <?php
        } else {
    ?>
        <p><?= $_SESSION['username'] ?>님 어서오세요!</p>
        <p><a href="./3_logout.php">로그아웃</a></p>
    <?php
        }
    ?>
</body>
</html>