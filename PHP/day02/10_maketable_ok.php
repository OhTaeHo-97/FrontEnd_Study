<?php
    $count = $_GET['count'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            border-collapse: collapse;
        }
        td {
            border: 3px solid red;
            width: 300px;
            height: 50px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h2>테이블 만들기</h2>
    <table>
        <?php
            // for($i = 1; $i <= $count; $i++) {
            //     echo "<tr>\n<td height = '50px' style = 'text-align:center;'>\n{$i}번째 셀</td>\n</tr>\n";
            // }
            for($i = 1; $i <= $count; $i++) {
                echo "<tr>\n";
                for($j = 1; $j <= $count; $j++) {
                    if($i % 2 == 0) {
                        if($j % 2 == 0) {
                            echo "<style = 'color:red; background-color: skyblue;'>\n{$i}번째 셀 {$j}번째 열</td>\n";
                        } else {
                            echo "<style = 'color:red; background-color:green;'>\n{$i}번째 셀 {$j}번째 열</td>\n";
                        }
                    } else {
                        if($j % 2 == 0) {
                            echo "<td style = 'color:blue; background-color: skyblue;'>\n{$i}번째 셀 {$j}번째 열</td>\n";
                        } else {
                            echo "<td style = 'color:blue; background-color:green;'>\n{$i}번째 셀 {$j}번째 열</td>\n";
                        }
                    }
                }
                echo "</tr>\n";
            }
        ?>
    </table>
</body>
</html>