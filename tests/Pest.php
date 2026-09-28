<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\TestResponse;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Pest\Browser\Plugin;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\BrowserTestCase;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;
use Saade\Fluppy\Tests\TestCase;

uses(TestCase::class)->in('Feature');
uses(BrowserTestCase::class)->in('Browser');

// The browser plugin needs PHP 8.3, and is left out where that is not there.
if (class_exists(Plugin::class)) {
    pest()->browser()->timeout(20000);
}

const UPPY = "window.Alpine.\$data(document.querySelector('.fi-fluppy')).getUppy()";

function storedFile(mixed $page): string
{
    return Storage::disk('uploads')->get(json_decode($page->text('#saved')));
}

function remoteForm(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing ?? fn (FluppyField $field) => $field->importFromUrl();

    return Livewire::test(FluppyForm::class);
}

function callRemoteField(Testable $component, string $method, array $arguments = []): mixed
{
    $field = $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    $component->call('callSchemaComponentMethod', $field->getKey(), $method, $arguments);

    return data_get($component->effects, 'returns.0');
}

/**
 * @param  array<string, mixed>  $plan
 * @param  array<string, mixed>  $input
 */
function askForPart(array $plan, array $input = []): TestResponse
{
    return test()
        ->withCookie(session()->getName(), session()->getId())
        ->post($plan['url'], ['sealed' => $plan['sealed'], ...$input], ['Accept' => 'application/json']);
}

/**
 * @param  array<string, mixed>  $plan
 */
function fetchInChunks(array $plan): string
{
    foreach (range(0, $plan['totalChunks'] - 1) as $index) {
        $response = askForPart($plan, ['capability' => $plan['capability'], 'index' => $index])->assertOk();
    }

    return $response->json('reference');
}
