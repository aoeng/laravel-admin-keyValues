<?php

namespace Aoeng\Laravel\Admin\KeyValues;

use Encore\Admin\Form\Field;

class KeyValuesField extends Field
{
    protected $view = 'laravel-admin-keyValues::index';

    protected static $js = [
        'vendor/aoeng/laravel-admin-keyValues/keyValues.js'
    ];

    protected static $css = [
        'vendor/aoeng/laravel-admin-keyValues/keyValues.css'
    ];

    public function render()
    {

        $this->script = <<< EOF
  new LaravelAdminKeyValues('{$this->column}')
EOF;
        return parent::render();
    }

}
