<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>foreach</title>
</head>
<body>
    <h2>foreach</h2>
    <form action="7_foreach_ok.php" method = "GET">
        체크박스1 <input type="checkbox" name="test[]" value = "일">
        체크박스2 <input type="checkbox" name="test[]" value = "이">
        체크박스3 <input type="checkbox" name="test[]" value = "삼">
        체크박스4 <input type="checkbox" name="test[]" value = "사">
        체크박스5 <input type="checkbox" name="test[]" value = "오">
        <input type="submit" value="제출">
    </form>
</body>
</html>