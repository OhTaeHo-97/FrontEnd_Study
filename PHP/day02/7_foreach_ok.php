<?php
    $tests = $_GET['test'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>foreach</title>
</head>
<body>
    <p>
        <?php 
            foreach($tests as $var) {
                echo "{$var} ";
            } // 앞에가 배열, 뒤에가 변수(꺼내올 변수)
        ?>
    </p>
</body>
</html>