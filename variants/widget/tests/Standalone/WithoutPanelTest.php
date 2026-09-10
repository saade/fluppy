<?php

use Livewire\Livewire;
use Saade\FilamentSkeleton\Widgets\SkeletonWidget;

it('falls back to the defaults where no panel registers the plugin', function () {
    Livewire::test(SkeletonWidget::class)
        ->assertOk()
        ->assertSeeHtml('Hello');
});
