<?php
    session_start();
    if(!isset($_SESSION['useridx'])) {
        echo "<script>alert('잘못된 접근입니다! 로그인 후 이용해주세요!'); location.href = '../login.php';</script>";
    } else {
        echo "<a href = '../logout.php'>로그아웃</a>";
    }
?>