<?php

namespace App\Jobs;

use App\Models\Product;
use App\Mail\LowStockMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class LowStockNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $productId;

    public function __construct(int $productId)
    {
        $this->productId = $productId;
    }

    public function handle()
    {
        $product = Product::findOrFail($this->productId);

        $adminEmail = config('shop.admin_email');

        if (! $adminEmail) {
            logger()->error('ADMIN_EMAIL is not configured');
            return;
        }

        Mail::to($adminEmail)->send(new LowStockMail($product));
    }
}
