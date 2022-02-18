<?php
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
?>

<!-- html 주석 <- 이 내용도 view 파일에 추가됨 -->