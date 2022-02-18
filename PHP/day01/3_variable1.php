<?php
    $userid = "apple";
    $username = "김사과";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>변수 - 1</title>
</head>
<body>
    <h2>변수 - 1</h2>
    <?php
        // echo("<h3>");
        // echo($userid);
        // echo("님 환영합니다!</h3>");
        // echo("<h3>" + $userid + "님 환영합니다!</h3>"); // +로 연결할 수 없음
        echo("<h3>".$userid."님 환영합니다!</h3>"); // .으로 연결
        // echo("<script>console.log('".$username."')</script>");
        echo "<p>아이디 : {$userid} 이름 : {$username}</p>"
        // 이렇게 {} 안에 변수를 쓰면 EL식처럼 쓸 수 있음
    ?>
    <script>
        console.log("<?=$username?>"); // 표현문을 통해 이렇게 사용할 수 있음
    </script>
    <!-- echo("<script>console.log('".$username."')</script>"); -->
    <!-- 이렇게 하면 불편함, 그렇기 때문에 script 내부에 username 값만 있으면 되기 떄문에 표현문을 통해 표현할 수 있음 -->
</body>
</html>