<?php

namespace Aoeng\Laravel\Admin\KeyValues;

use Encore\Admin\Admin;
use Encore\Admin\Form;
use Illuminate\Support\ServiceProvider;

class KeyValuesServiceProvider extends ServiceProvider
{
    public function boot(KeyValues $extension)
    {
        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'laravel-admin-keyValues');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes([
                $assets => public_path('vendor/aoeng/laravel-admin-keyValues')
            ], 'laravel-admin-keyValues'
            );
        }

        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        Admin::booting(function () {
            Form::extend('keyValues', KeyValuesField::class);
        });
    }
}
