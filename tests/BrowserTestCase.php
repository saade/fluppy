<?php

namespace Saade\Fluppy\Tests;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Saade\Fluppy\Tests\Fixtures\FakeDropbox;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;
use Saade\Fluppy\Tests\Fixtures\FluppyPage;
use Saade\Fluppy\Tests\Fixtures\ParseMultipartBody;

/**
 * For tests that drive a real browser. The page they open is the fixture
 * form in a bare layout, served by the same application the test runs in,
 * so a test can prepare the field and look at what was stored.
 */
class BrowserTestCase extends TestCase
{
    protected static bool $hasPublishedAssets = false;

    protected function setUp(): void
    {
        parent::setUp();

        if (! static::$hasPublishedAssets) {
            Artisan::call('filament:assets');

            static::$hasPublishedAssets = true;
        }

        // Livewire 3 only finds a component outside the application's own
        // namespace again, on its next request, when it has a name.
        Livewire::component('fluppy-page', FluppyPage::class);

        Storage::fake('uploads');

        // The disk Livewire keeps temporary uploads on while tests run. Its
        // testing helpers set it up; a browser does not go through them.
        Storage::fake('tmp-for-tests');

        $this->app->make(Kernel::class)->prependMiddleware(ParseMultipartBody::class);
    }

    protected function tearDown(): void
    {
        FluppyForm::$configureUsing = null;
        FluppyForm::$fill = [];

        parent::tearDown();
    }

    protected function defineEnvironment($app): void
    {
        parent::defineEnvironment($app);

        $app['config']->set('session.driver', 'file');

        // The server Pest's browser plugin runs accepts requests of up to
        // 128 KB, so a file is "large" from 64 KB here.
        $app['config']->set('fluppy.chunking.chunk_size', 64);
        $app['config']->set('view.paths', [__DIR__ . '/Fixtures/views', ...$app['config']->get('view.paths')]);
    }

    protected function defineRoutes($router): void
    {
        Route::middleware('web')->group(function () {
            Route::view('fluppy-tests', 'page');

            // Where the fake disk says its files are, so the browser can
            // open one that is already stored. Not streamed: the server
            // Pest's browser plugin runs never finishes a streamed response.
            Route::get('storage/{path}', fn (string $path) => response(Storage::disk('uploads')->get($path))
                ->header('Content-Type', Storage::disk('uploads')->mimeType($path)))
                ->where('path', '.*');

            // Stands in for the page of a provider where a person lets the
            // application in: it sends them straight back, as one who agreed.
            Route::get('fluppy-tests/authorize', fn (Request $request) => redirect()->away(
                $request->query('redirect_uri') . '?' . http_build_query(['code' => FakeDropbox::CODE, 'state' => $request->query('state')]),
            ));

            // There is no compiled theme here, and Uppy's own stylesheet is
            // enough for its interface to be laid out and clickable.
            Route::get('fluppy-tests/uppy.css', fn () => response()->file(
                __DIR__ . '/../resources/css/uppy.css',
                ['Content-Type' => 'text/css'],
            ));
        });
    }
}
