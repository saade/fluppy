<?php

use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

afterEach(fn () => FluppyForm::$configureUsing = null);

function fluppyForm(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing;

    return Livewire::test(FluppyForm::class);
}

it('renders the field with its Alpine component', function () {
    fluppyForm()
        ->assertOk()
        ->assertSeeHtml(['fluppy(', 'fi-fluppy', 'step: 1']);
});

it('passes its options to the browser', function () {
    fluppyForm(fn (FluppyField $field) => $field->step(fn (): int => 5))
        ->assertSeeHtml('step: 5');
});

it('saves the state it was given', function () {
    fluppyForm()
        ->set('data.amount', 3)
        ->call('save')
        ->assertSet('data.amount', 3);
});
