<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Low Stock Alert</title>
</head>
<body>
<h2>Low Stock Alert</h2>
<p>
    The product <strong>{{ $product->name }}</strong> is running low on stock.
</p>
<p>
    Remaining quantity: <strong>{{ $product->stock_quantity }}</strong>
</p>

<p>
    Please restock soon.
</p>
</body>
</html>
