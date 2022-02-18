<?php
    include "./include/dbconn.php";
    $userid = $_POST['userid'];
    $userpw = $_POST['userpw'];
    $username = $_POST['name'];
    $userphone = $_POST['hp'];
    $usergender = $_POST['usergender'];
    $useremail = $_POST['email'];
    $userhobby = $_POST['hobby'];   //['공부','게임','코딩']
    $hobbystr = $userhobby[0];      //"공부"
    
    for ($i=1; $i < count($userhobby); $i++) {      //1 2
        $hobbystr .= ",".$userhobby[$i];    //"공부,게임,코딩"
    }
    $zipcode = $_POST['zipcode'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $address3 = $_POST['address3'];

    $sql = "insert into tb_user (userid,userpw,username,userphone,useremail,userhobby,zipcode,address1,address2,address3,usergender) values('$userid',md5('$userpw'),'$username','$userphone','$useremail','$hobbystr','$zipcode','$address1','$address2','$address3','$usergender')";
    
    $result = mysqli_query($conn,$sql);
    //insert into 테이블명 values (apple,10,...)
    setcookie("joinid",$userid,time()+60*5,"/");
?>
<script>
    alert("회원가입 성공!");
    location.href="./login.php";
</script>