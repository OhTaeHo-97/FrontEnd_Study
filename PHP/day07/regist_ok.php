<?php
    include "include/dbconn.php";
    $userid = $_POST['userid'];
    $userpw = $_POST['userpw'];
    $username = $_POST['username'];
    $hp = $_POST['hp'];
    $usergender = $_POST['usergender'];
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

    $sql = "insert into tb_user (userid,userpw,username,userphone,useremail,userhobby,zipcode,address1,address2,address3,usergender) values('$userid',md5('$userpw'),'$username','$hp','$email','$hobbystr','$zipcode','$address1','$address2','$address3','$usergender')";
    echo $sql;

    $result = mysqli_query($conn, $sql);
    echo $result;
    setcookie("joinid", $userid, time() + 60 * 5, "/"); // 로그인 페이지는 기존 사용자라면 바로 로그인부터 사용할 것임, 아니면 회원가입 하고 로그인으로 이동했을 것이고
    // id 자리를 비워둘 것임(기존에는), 방금 회원가입한 사람의 아이디는 써주려고 함(비밀번호만 쓸 수 있게)
?>

<script>
    alert("회원가입 성공!");
    location.href = "3_login.php";
</script>

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