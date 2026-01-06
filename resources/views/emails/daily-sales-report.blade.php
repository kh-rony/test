<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Daily Sales Report</title>
</head>
<body>
<h2>Daily Sales Report</h2>

<table border="1" cellpadding="8" cellspacing="0">
    <thead>
    <tr>
        <th>Product</th>
        <th>Quantity Sold</th>
        <th>Total Amount</th>
    </tr>
    </thead>
    <tbody>
    @php $grandTotal = 0; @endphp

    @foreach ($items as $item)
        @php
            $lineTotal = $item->price * $item->quantity;
            $grandTotal += $lineTotal;
        @endphp
        <tr>
            <td>{{ $item->product->name }}</td>
            <td>{{ $item->quantity }}</td>
            <td>${{ number_format($lineTotal, 2) }}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<h3>Total Revenue: ${{ number_format($grandTotal, 2) }}</h3>

<p>Generated automatically by Simple Shopping Cart.</p>
</body>
</html>
