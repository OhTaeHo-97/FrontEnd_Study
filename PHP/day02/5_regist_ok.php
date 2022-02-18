<?php
    $userid = $_POST['userid'];
    $userpw = $_POST['userpw'];
    $username = $_POST['username'];
    $hp = $_POST['hp'];
    $email = $_POST['email'];
    $hobby = $_POST['hobby'];
    $hobbystr = $hobby[0];
    for($i = 1; $i < count($hobby); $i++) {
        $hobbystr .= ",".$hobby[$i];
    }
    $zipcode = $_POST['zipcode'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $address3 = $_POST['address3'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>회원가입 완료</h2>
    <p>아이디 : <?= $userid ?></p>
    <p>비밀번호 : <?= $userpw ?></p>
    <p>이름 : <?= $username ?></p>
    <p>휴대폰 번호 : <?= $hp ?></p>
    <p>이메일 : <?= $email ?></p>
    <p>취미 : <?= $hobbystr ?>
    </p>
    <p>우편번호 : <?= $zipcode ?></p>
    <p>주소 : <?= $address1 ?></p>
    <p>상세주소 : <?= $address2 ?></p>
    <p>참고항목 : <?= $address3 ?></p>
</body>
</html>