<?php

use Livewire\Livewire;
use Saade\FilamentSkeleton\Tests\Fixtures\SkeletonForm;

it('falls back to the defaults where no panel registers the plugin', function () {
    Livewire::test(SkeletonForm::class)
        ->assertOk()
        ->assertSeeHtml('step: 1');
});
