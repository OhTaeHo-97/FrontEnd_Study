<!-- php
    function hello() { // 함수 선언은 function
        echo("<p>Hello PHP!</p>");
    }
    function add($num1, $num2) {
        // echo("<p>{$num1} + {$num2} = {$num1 + $num2}</p>"); // 중괄호 안에는 변수명만 있어야 함!, 그렇기 때문에 문자열 연결로 가야 함!
        echo("<p>{$num1} + {$num2} = ".($num1 + $num2)."</p>"); // num1, num2를 더한 후 이를 문자열 연결을 이용하여 연결해주기!
    }
    function getSum($num1, $num2) {
        return $num1 + $num2;
    }
?> -->

<?php
    include "lib/myfunction.php";
//     include할 때 거기에는 front를 구현해놓으면 안됨!(백의 역할만 할 것이기 때문에)
//     include -> 거기에 있는 모든 내용을 그대로 복사 붙여넣기 한다고 보면 됨!
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>함수</title>
</head>
<body>
    <?php
        include "layout/header.php";
    ?>
    <h2>함수</h2>
    <?php
        hello();
        add(10, 3);
        echo getSum(10, 20);
    ?>
    <!-- echo getSum(10, 20);가 아래와 같은 식 -->
    <?= getSum(10, 20) ?>
</body>
</html>