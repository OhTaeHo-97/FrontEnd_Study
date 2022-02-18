<?php
    include "../include/logincheck.php";
    include "../include/dbconn.php";

    // 파라미터 boardidx의 유효성 검사 진행 필요
    $boardidx = $_GET['boardidx'];
    
    $sql = "delete from tb_board where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql);
    echo "<script>alert('{$boardidx}번 게시글이 삭제되었습니다.'); location.href = 'list.php';</script>";
?>