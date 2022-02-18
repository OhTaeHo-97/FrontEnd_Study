<?php
    include "../include/dbconn.php";
    include "../include/logincheck.php";

    $boardidx = $_POST['boardidx'];
    $replycontent = $_POST['replycontent'];
    $userid = $_SESSION['userid'];

    $sql = "insert into tb_reply (boardidx, replycontent, userid) values ($boardidx, '$replycontent', '$userid')";
    $result = mysqli_query($conn, $sql);

    echo "<script>alert('댓글 작성 완료!'); location.href = './detail.php?boardidx=$boardidx';</script>";
?>