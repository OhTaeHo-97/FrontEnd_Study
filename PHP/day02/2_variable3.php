<?php
    function counter() {
        // $num = 1;
        static $num = 1;
        echo "<p>변수 num의 값 : {$num}</p>";
        $num++;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>변수 - 3</title>
</head>
<body>
    <h2>변수 - 3</h2>
    <?php
        counter();
        counter();
        counter();
        counter();
        counter();
        counter();
    ?>
</body>
</html>