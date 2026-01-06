<?php

use Illuminate\Console\Scheduling\Schedule;
use App\Jobs\DailySalesReport;

app()->booted(function () {
    $schedule = app(Schedule::class);

    // schedule daily sales report
    // runs daily at 6 PM
//    $schedule->job(new DailySalesReport)->dailyAt('18:00');

    $schedule->job(new DailySalesReport)->everyMinute();
});
