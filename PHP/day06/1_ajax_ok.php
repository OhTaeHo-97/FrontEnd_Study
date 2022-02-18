<?php
    if(isset($_GET['userid'])) {
        $userid = $_GET['userid'];
        $userpw = $_GET['userpw'];
    } else {
        $userid = $_POST['userid'];
        $userpw = $_POST['userpw'];
    }
    // GET으로 날라온 user id를 받기
    // $userid = $_GET['userid'];
    // $userpw = $_GET['userpw'];
    // echo($userid."<br>");
    // echo($userpw."<br>");

    // $userid = $_POST['userid'];
    // $userpw = $_POST['userpw'];
    echo($userid."<br>");
    echo($userpw."<br>");
?>