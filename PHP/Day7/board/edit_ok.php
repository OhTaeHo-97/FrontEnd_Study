<?php
    // include "../include/logincheck.php";
    include "../include/dbconn.php";

    $boardidx = $_POST['boardidx'];
    $boardtitle = $_POST['boardtitle'];
    $boardcontent = $_POST['boardcontent'];

    $sql = "update tb_board set boardtitle = '$boardtitle', boardcontent = '$boardcontent' where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql);

    echo "<script>alert('{$boardidx}번 게시글이 수정되었습니다.');location.href='detail.php?boardidx=$boardidx';</script>"
?>