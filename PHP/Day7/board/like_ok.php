<?php
    include "../include/logincheck.php";
    include "../include/dbconn.php";

    $boardidx = $_GET['boardidx'];
    $sql = "update tb_board set boardlike = boardlike + 1 where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql); // 정상적으로 성공했으면 true, 실패했으면 false
    $sql = "select boardlike from tb_board where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_array($result);
    echo $data['boardlike'];
?>