<?php

namespace App\Jobs;

use App\Models\OrderItem;
use App\Mail\DailySalesReportMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class DailySalesReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $today = now()->toDateString();

        $items = OrderItem::with(['product', 'order'])
            ->whereHas('order', function ($query) use ($today) {
                $query->whereDate('created_at', $today);
            })
            ->get();

//        if ($items->isEmpty()) {
//            return; // no sales today, no email
//        }

        $adminEmail = config('shop.admin_email');

        Mail::to($adminEmail)->send(new DailySalesReportMail($items));
    }
}
