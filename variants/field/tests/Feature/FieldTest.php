<?php

use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\FilamentSkeleton\Forms\Components\SkeletonField;
use Saade\FilamentSkeleton\Tests\Fixtures\SkeletonForm;

afterEach(fn () => SkeletonForm::$configureUsing = null);

function skeletonForm(?Closure $configureUsing = null): Testable
{
    SkeletonForm::$configureUsing = $configureUsing;

    return Livewire::test(SkeletonForm::class);
}

it('renders the field with its Alpine component', function () {
    skeletonForm()
        ->assertOk()
        ->assertSeeHtml(['filamentSkeleton(', 'fi-sk', 'step: 1']);
});

it('passes its options to the browser', function () {
    skeletonForm(fn (SkeletonField $field) => $field->step(fn (): int => 5))
        ->assertSeeHtml('step: 5');
});

it('saves the state it was given', function () {
    skeletonForm()
        ->set('data.amount', 3)
        ->call('save')
        ->assertSet('data.amount', 3);
});
