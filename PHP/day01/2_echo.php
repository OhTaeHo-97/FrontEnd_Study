<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP의 출력</title>
</head>
<body>
    <h2>PHP의 출력</h2>
    <?php
        echo(3+2); // 5
        echo "<br>"; // 줄바꿈
        echo 3+2; // 5
        echo "<hr>"; // echo -> 안에 있는 것은 HTML에 그대로 써진다고 생각하면 됨
        echo "<button>버튼</button>";
    ?>
    <hr>
    <?= 3+2 ?> <!-- 표현문 -->
    <!-- echo로 감싸주지 않아도 5로 나타남(자동으로 바뀌어서 사실은 echo 3+2;와 같은 뜻) -->
    <!-- 표현문 안에 3+2;를 쓰면 echo(3+2;); 와 같으므로 ;을 쓰지 않음(표현문 안에 쓴 값이 그대로 echo로 넘어갈 것이므로) -->
</body>
</html>