<?php
    include "../include/logincheck.php";
    include "../include/dbconn.php";
    // detail.php로 요청하는데 그 때 boardidx를 보내줘 어떤 글인지 알려줄 것임
    if(!isset($_GET['boardidx'])) {
        echo "<script>alert('잘못된 접근입니다!'); location.href = './list.php';</script>";
    }
    $boardidx = $_GET['boardidx'];
    // boardidx가 유효한 번호인지 확인
    $sql = "select boardidx from tb_board where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_array($result);
    if(!isset($data['boardidx'])) {
        echo "<script>alert('잘못된 접근입니다!'); location.href = './list.php';</script>";
    }
    // 조회수 올리기
    $sql = "update tb_board set boardhit = boardhit+1 where boardidx = $boardidx";
    $result = mysqli_query($conn, $sql);

    // 게시글 내용 긁어오기(검색해오기)
    $sql = "select * from tb_board where boardidx = $boardidx"; // 번호에 해당하는 게시글 하나를 가져옴
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_array($result);

    $boardidx = $data['boardidx'];
    $boardtitle = $data['boardtitle'];
    $boardcontent = $data['boardcontent'];
    $boardlike = $data['boardlike'];
    $boardhit = $data['boardhit'];
    $userid = $data['userid'];
    $boardregdate = $data['boardregdate'];

    $loginid = $_SESSION['userid'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>글보기</title>
</head>
<body>
    <h2>글보기</h2>
    <a href="">로그아웃</a>
    <table border = "1" width = "800">
        <tr>
            <th>제목</th>
            <td><?= $boardtitle ?></td>
        </tr>
        <tr>
            <th>작성자</th>
            <td><?= $userid ?></td>
        </tr>
        <tr>
            <th>날짜</th>
            <td><?= $boardregdate ?></td>
        </tr>
        <tr>
            <th>조회수</th>
            <td><?= $boardhit ?></td>
        </tr>
        <tr>
            <th>좋아요</th>
            <td id = "like"><?= $boardlike ?></td>
        </tr>
        <tr>
            <th>내용</th>
            <td><?= $boardcontent ?></td>
        </tr>
        <tr>
            <td colspan = "2">
                <?php
                    if($userid == $loginid) {
                ?>
                <a href="edit.php?boardidx=<?= $boardidx ?>">수정</a>
                <a href="delete.php?boardidx=<?= $boardidx ?>">삭제</a>
                <?php
                    } else {
                ?>
                    <img src="../images/like.png" alt="좋아요" width = "20" onclick = "like();">
                <?php
                    }
                ?>
                <a href="./list.php">리스트</a>
            </td>
        </tr>
    </table>
    <hr>
    <form action="reply_ok.php" method = "POST">
        <input type="hidden" name = "boardidx" value = "<?= $boardidx ?>">
        <p>
            <?= $loginid ?> : <input type="text" name="replycontent" id="" size = "100">
            <input type="submit" value="확인">
        </p>
    </form>
    <hr>
    <?php
        $sql = "select replyidx, userid, replycontent, replyregdate from tb_reply where boardidx = $boardidx order by replyidx desc";
        $result = mysqli_query($conn, $sql);
        while($data = mysqli_fetch_array($result)) {
            $replyidx = $data['replyidx'];
            $userid = $data['userid'];
            $replycontent = $data['replycontent'];
            $replyregdate = $data['replyregdate'];
    ?>
    <p><?= $userid ?> : <?= $replycontent ?> (<?= $replyregdate ?>)</p>
    <?php
        }
    ?>
</body>
<script>
    function like() {
        const xhr = new XMLHttpRequest(); // 만들었을 때는 상태가 0
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                if(xhr.status == 200) {
                    alert("좋아요~");
                    document.getElementById("like").innerHTML = xhr.responseText; // responseText -> 응답을 문자열로 가져오는 것 -> 응답이 $data['boardlike']임
                    // document.getElementById("like").innerHTML = document.getElementById("like").innerHTML + 1;
                }
            }
        }
        // 실제로 xhr의 상태가 바뀔 때 onreadystatechange가 호출됨
        // 상태는 open 했을 때 바뀌고, send했을 때 바뀌고 함
        xhr.open("GET", "like_ok.php?boardidx=<? $boardidx ?>", true); // open하는 순간 1로 바뀜(DONE 상태가 아니니 readystatechange 안에 로직을 수행하지 않음)
        xhr.send(); // 상태가 HR, Loading, Done 이렇게 2,3,4 바뀔 것임 -> 이렇게 send 한 번에 3번 상태가 바뀜
    }
</script>
</html>