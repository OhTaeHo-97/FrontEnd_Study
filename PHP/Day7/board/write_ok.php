<?php
    include "../include/logincheck.php";
    include "../include/dbconn.php";

    $userid = $_SESSION['userid'];
    $boardtitle = $_POST['boardtitle'];
    $boardcontent = $_POST['boardcontent'];

    $sql = "insert into tb_board(userid, boardtitle, boardcontent) values('$userid', '$boardtitle', '$boardcontent')";
    $result = mysqli_query($conn, $sql);

    echo "<script>alert('작성 완료!'); location.href = './list.php';</script>";
?>