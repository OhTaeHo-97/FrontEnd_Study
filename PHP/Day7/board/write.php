<?php
    include "../include/logincheck.php";
    $userid = $_SESSION['userid'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>글쓰기</title>
</head>
<body>
    <h2>글쓰기</h2>
    <form action="write_ok.php" method = "POST">
        <p>아이디 : <?= $userid ?></p>
        <p>제목 : <input type="text" name="boardtitle" id=""></p>
        <p>내용</p>
        <p><textarea name="boardcontent" id="" cols="40" rows="10"></textarea></p>
        <p><input type="submit" value="확인"><input type="reset" value="다시작성"><input type="button" value="리스트" onclick = "location.href='list.php'"></p>
    </form>
</body>
</html>