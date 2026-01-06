<?php

use Illuminate\Console\Scheduling\Schedule;
use App\Jobs\DailySalesReport;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


app()->booted(function () {
    $schedule = app(Schedule::class);

//    $schedule->job(new DailySalesReport)->dailyAt('18:00');
//    $schedule->job(new DailySalesReport)->everyMinute();
});
