<?php
    // POST로 전송된 데이터가 있다면
    if($_POST != null) { // 그냥 $_POST만 하면 날라온게 있는지 없는지 확인해볼 수 있음
        // fs라는 변수에 "reply.txt"를 "a"모드(append)로 열어서 넣어라!
        $fs = @fopen("reply.txt", "a") or exit("break"); // 추가모드로 reply.txt를 열기, 실패했다면 종료(exit("break"))
        if($fs != null) {
            // POST로 보낸 'msg'라는 이름의 데이터를 msg라는 변수에 넣어라!
            $msg = $_POST['msg'];
            // fs 변수로 열은 파일에 msg라는 변수에 있는 데이터에 \n 연겷해서 추가해라!
            fputs($fs, $msg."\n"); // fs로 연 파일에다가 msg를 넣음, 엔터를 넣어서
            // fs 변수에 넣어둔 열린 파일 닫기!
            fclose($fs);
        }
    }
    $result = "";
    $fs = @fopen("reply.txt", "r") or exit("break");
    // fs에 열어둔 파일에 커서가 마지막까지 왔는지 확인
    while(!feof($fs)) { // fs로 열은 파일의 마지막이 아니라면
        // fs의 한 줄을 읽어오며 커서를 아래로 내리고 내용은 msg 변수에 넣음
        $msg = fgets($fs);
        // msg에 읽힌 내용이 ""(공백)이 아니라면
        if($msg != "\n") {
            // result에 msg를 앞에다가 연결
            $result = $msg."<br>".$result;
        }
    }
    fclose($fs);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>파일을 이용한 댓글</title>
</head>
<body>
    <h2>파일을 이용한 댓글</h2>
    <form method = "POST">
        <p>
            <label>댓글 <input type="text" name = "msg"></label>
            <input type="submit" value="댓글달기">
        </p>
    </form>
    <hr>
    <p>
        <?= $result ?>
    </p>
</body>
</html>