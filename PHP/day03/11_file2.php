<?php
    $result = "";
    $lines = @file("data.txt") or $result = "파일을 가져올 수 없습니다."; // data1.txt라고 하면 파일이 없기 때문에 에러가 발생 -> @을 이용해서 실패할 때는 or을 통해 파일을 가져올 수 없다는 것을 변수로 저장

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>파일 입출력 - 2</title>
</head>
<body>
    <h2>파일 입출력 - 2</h2>
    <?php
        if($lines != null) { // 정상적으로 읽었다는 뜻
            for($i = 0; $i < count($lines); $i++) {
                $result .= $lines[$i]."<hr>";
            }
        }
    ?>
    <p><?= $result ?></p>
</body>
</html>