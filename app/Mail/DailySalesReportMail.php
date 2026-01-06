<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class DailySalesReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public Collection $items;

    public function __construct(Collection $items)
    {
        $this->items = $items;
    }

    public function build()
    {
        return $this
            ->subject('Daily Sales Report')
            ->view('emails.daily-sales-report');
    }
}
