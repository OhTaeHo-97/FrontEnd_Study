<?php
    include "./include/dbconn.php";
    $userid = $_GET['userid'];
    // select useridx from tb_user where userid='apple'
    $sql = "select useridx from tb_user where userid='$userid'";

    $result = mysqli_query($conn,$sql);
    $data = mysqli_fetch_array($result);

    echo isset($data['useridx'])?"X":"O";
?>