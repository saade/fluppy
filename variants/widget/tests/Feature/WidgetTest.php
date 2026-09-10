<?php

use Livewire\Livewire;
use Saade\FilamentSkeleton\Tests\Fixtures\QuietSkeletonWidget;
use Saade\FilamentSkeleton\Widgets\SkeletonWidget;

it('renders with the setting of the panel plugin', function () {
    Livewire::test(SkeletonWidget::class)
        ->assertOk()
        ->assertSeeHtml('fi-sk')
        ->assertSeeHtml('Hello from the panel');
});

it('lets a widget override the setting of the panel plugin', function () {
    expect(Livewire::test(QuietSkeletonWidget::class)->instance()->getGreeting())->toBe('Psst');
});
