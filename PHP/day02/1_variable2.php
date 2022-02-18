<?php
    $num = 10;
    function f1() {
        $str = "PHP";
        echo "<p>함수 안에서 호출한 지역변수 str : {$str}</p>";
    }
    function f2() {
        global $num;
        echo "<p>함수 안에서 호출한 전역변수 num : {$num}</p>";
        $num = $num + 5;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>변수 - 2</title>
</head>
<body>
    <h2>변수 - 2</h2>
    <?php
        f1(); // echo 바로 호출됨
        f2(); // php는 기본적으로 전역변수 사용 불가(PHP 변수는 선언인지 사용인지 구별할 수 없음(JS에서는 선언과 사용을 구분할 수 있었음))
        // 없던 이름에 넣게 되면 선언
        // f2에서 $num = 20 이렇게 했다면 이는 전역변수가 아닌 지역변수가 생기는 것(이런 모호성 때문에 아예 전역변수를 사용할 수 없음)
        // 지역에서 전역변수를 사용하려면 $num 이렇게 사용해야 하는데 이것이 선언인지 사용인지 구분할 수 없음(새로운 지역 내에서 그 지역 내에 없던 이름에 $num에 20을 넣게 되니)
        // 모호성을 없애고자 함수 내에서는 지역변수만 사용하도록 되어있음
        // 전역변수인 num을 사용하려면 특정 keyword를 써줘야 함 -> global $num
        // PHP는 함수 내에 있는 지역변수와 전역변수가 이름이 같을 일이 없음
        // 전역변수는 수정이 되지 않는 값들을 담을 때가 많음(불편하게 전역변수를 써야하니 웬만하면 쓰지 말라는 뜻)
        // global 이용해서 전역변수를 이용할 수 있다!
        // 함수 바깥에서는 전역변수 그냥 사용 가능
        echo "<p>함수 밖에서 호출한 전역변수 num : {$num}</p>";
    ?>
</body>
</html>