<?php
    include "../include/dbconn.php";

    // 전체 개수 세서 total이라는 별칭으로 검색할 것임
    $sql = "select count(boardidx) total from tb_board";
    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_array($result);

    $total = $data['total'];

    $pageCount = 10; // 페이지당 보여질 게시글 개수
    $start = 0; // 게시글의 시작 행 번호(시작 위치 인덱스)
    $page = 1; // 몇 페이지인지 페이지 번호(지정하지 않는다면 1페이지)

    // list.php?page=3
    if(isset($_GET['page'])) {
        $page = $_GET['page'];
        $start = ($page - 1) * $pageCount;
    }

    $sql = "select boardidx, boardtitle, userid, boardhit, boardlike, boardregdate, from tb_board order by boardidx desc limit $start, $pageCount";
    $result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>리스트</title>
</head>
<body>
    <h2>리스트</h2>
    <p>전체 글개수: <?= $total ?></p>
    <table border = "1" width = "800"> 
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>조회수</th>
            <th>좋아요</th>
            <th>날짜</th>
        </tr>
        <tr>
            <td>100</td>
            <td><a href="#">가장 최근 게시글</a></td>
            <td>apple</td>
            <td>100</td>
            <td>5</td>
            <td>2022-02-04</td>
        </tr>
        <tr>
            <td colspan = "6" align = "center">
                <!-- 페이징처리 -->
                <a href = "#">1</a> 2 3 4 5
            </td>
        </tr>
    </table>
    <p><a href="./write.php">글쓰기</a></p>
</body>
</html>