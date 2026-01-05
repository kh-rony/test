<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Low Stock Alert</title>
</head>
<body>
<h2>Low Stock Warning</h2>

<p>The following product is running low on stock:</p>

<ul>
    <li><strong>Product:</strong> {{ $product->name }}</li>
    <li><strong>Remaining Stock:</strong> {{ $product->stock_quantity }}</li>
    <li><strong>Price:</strong> ${{ $product->price }}</li>
</ul>

<p>Please restock soon.</p>
</body>
</html>
