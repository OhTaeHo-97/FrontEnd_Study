<?php
    session_start();
    session_unset();
    echo "<script>alert('로그아웃되었습니다!');location.href = '9_login.php';</script>";
?>