<?php
    $str1 = "abcdefghijklmnopqrstuvwxyz";
    $str2 = "가나다라마바사아자차카타파하";
    $str3 = "apple/banana/cherry/durian";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문자열 함수</title>
</head>
<body>
    <h2>문자열 함수</h2>
    <?php
        echo strlen($str1)."<br>";
        echo strlen($str2)."<br>"; // strlen() -> byte 수(특수문자, 영어 등은 1byte씩, 한글은 하나당 3byte)
        echo mb_strlen($str2, "utf-8")."<br>";
        echo "<hr>";
        echo strcmp("abcd", "abcf")."<br>";
        echo strcmp("abcd", "ABCD")."<br>"; // 소문자가 대문자보다 큼(ASCII 코드)
        echo strcmp("10", "2")."<br>";
        echo strcmp("abc", "abc")."<br>";
        echo "<hr>";
        echo strstr($str1, "cd")."<br>"; // cd가 처음 나오는 부분부터 끝까지 return
        echo strpos($str1, "cd")."<br>"; // c가 index 2, 그래서 2 출력됨
        echo "<hr>";
        echo substr($str1, 2)."<br>"; // index 2부터 시작해서 끝까지 return
        echo substr($str1, -2)."<br>"; // 뒤에서 2번째부터 끝까지 return(yz 출력됨)(음수 인덱스는 맨 뒤에가 -1임)
        echo substr($str1, 2, 5)."<br>"; // index 2부터 5개 return
        echo "<hr>";
        $arr = explode("/", $str3); // explode -> 배열로 return됨!
        foreach ($arr as $name) {
            echo $name." ";
        }
        echo "<hr>";
        echo str_replace("/", "*", $str3); // 앞에가 어떤 것을 바꿀지, 두 번째가 어떤 것으로 바꿀지, 세 번째가 문자열
    ?>
</body>
</html>