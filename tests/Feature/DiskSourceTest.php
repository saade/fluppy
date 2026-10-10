<?php

use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');
    Storage::fake('library');

    config(['fluppy.remote.part_size' => 1]);

    foreach ([
        'brand/logo.png' => picture(10, 10),
        'brand/Guide.pdf' => 'a guide',
        'brand/.hidden' => 'not shown',
        'brand/photos/office.jpg' => 'an office',
        'brand/photos/2026/team.jpg' => 'a team',
        'brand/photos/2026/Team (old).jpg' => 'an older team',
        'private/salaries.csv' => 'not for everyone',
    ] as $path => $contents) {
        Storage::disk('library')->put($path, $contents);
    }
});

afterEach(fn () => FluppyForm::$configureUsing = null);

function diskForm(?string $directory = 'brand', ?string $disk = 'library', ?string $label = null, ?Closure $filterUsing = null): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->multiple()->importFromDisk($disk, $directory, $label, $filterUsing));
}

/**
 * @return array<int, array{0: string, 1: string, 2: bool}> The id, the name and whether it is a folder, of each item.
 */
function listedOnDisk(Testable $component, ?string $path = null): array
{
    return array_map(
        fn (array $item): array => [$item['id'], $item['name'], $item['isFolder']],
        callRemoteField($component, 'listRemoteFiles', ['source' => 'disk', 'path' => $path])['items'],
    );
}

/**
 * @return array<int, string> The id of each item.
 */
function foundOnDisk(Testable $component, string $term, ?string $path = null): array
{
    return array_column(callRemoteField($component, 'searchRemoteFiles', ['source' => 'disk', 'term' => $term, 'path' => $path])['items'], 'id');
}

it('offers a disk of the application only on a field that names one, under the name the field gives it', function () {
    $field = fn (Testable $component): FluppyField => $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    expect($field(diskForm())->getRemoteSources()['disk'])
        ->label->toBe('Files')
        ->isSearchable->toBeTrue()
        ->icon->toContain('<svg')
        ->views->toBe(['grid' => 'Grid', 'list' => 'List'])
        ->and($field(diskForm(label: 'Brand assets'))->getRemoteSources()['disk']['label'])->toBe('Brand assets')
        ->and($field(diskForm(disk: null))->getRemoteSources())->toBe([])
        ->and($field(remoteForm(fn (FluppyField $field) => $field))->getRemoteSources())->toBe([]);
});

it('lists a folder of the disk, folders first, without what is hidden', function () {
    $listing = callRemoteField(diskForm(), 'listRemoteFiles', ['source' => 'disk']);

    expect($listing)
        ->authenticated->toBeTrue()
        ->nextPagePath->toBeNull()
        ->and(array_map(fn (array $item): array => [$item['id'], $item['name'], $item['isFolder'], $item['mimeType'], $item['size']], $listing['items']))
        ->toBe([
            ['%2Fphotos', 'photos', true, null, null],
            ['%2FGuide.pdf', 'Guide.pdf', false, 'application/pdf', 7],
            ['%2Flogo.png', 'logo.png', false, 'image/png', strlen(picture(10, 10))],
        ]);
});

it('opens the folders inside the one the field chose, and only those', function () {
    $component = diskForm();

    expect(listedOnDisk($component, '%2Fphotos'))->toBe([
        ['%2Fphotos%2F2026', '2026', true],
        ['%2Fphotos%2Foffice.jpg', 'office.jpg', false],
    ]);

    // Named the way a browser's `encodeURIComponent()` names it, which is
    // how Uppy names what a search finds.
    expect(listedOnDisk($component, '%2Fphotos%2F2026'))->toBe([
        ['%2Fphotos%2F2026%2FTeam%20(old).jpg', 'Team (old).jpg', false],
        ['%2Fphotos%2F2026%2Fteam.jpg', 'team.jpg', false],
    ]);

    foreach (['..', '../private', '%2F..%2Fprivate', 'photos/../../private', './photos'] as $path) {
        expect(callRemoteField($component, 'listRemoteFiles', ['source' => 'disk', 'path' => $path]))
            ->toBe(['authenticated' => true, 'error' => 'Files cannot be fetched from there.']);
    }
});

it('lists the whole disk when the field names no folder', function () {
    expect(listedOnDisk(diskForm(directory: null)))->toBe([
        ['%2Fbrand', 'brand', true],
        ['%2Fprivate', 'private', true],
    ]);
});

it('searches the folder the field chose and the ones below it, by name', function () {
    $component = diskForm();

    expect(foundOnDisk($component, 'TEAM'))->toBe(['%2Fphotos%2F2026%2FTeam%20(old).jpg', '%2Fphotos%2F2026%2Fteam.jpg'])
        ->and(foundOnDisk($component, 'photo'))->toBe(['%2Fphotos'])
        ->and(foundOnDisk($component, 'salaries'))->toBe([])
        ->and(foundOnDisk($component, 'hidden'))->toBe([])
        ->and(foundOnDisk($component, '  '))->toBe([]);
});

it('searches only the folder it is asked about', function () {
    $component = diskForm();

    expect(foundOnDisk($component, 'o', '%2Fphotos'))->toBe(['%2Fphotos%2F2026%2FTeam%20(old).jpg', '%2Fphotos%2Foffice.jpg'])
        ->and(foundOnDisk($component, 'logo', '%2Fphotos'))->toBe([])
        ->and(callRemoteField($component, 'searchRemoteFiles', ['source' => 'disk', 'term' => 'salaries', 'path' => '../private']))
        ->toBe(['authenticated' => true, 'error' => 'Files cannot be fetched from there.']);
});

it('does not search a source that cannot be searched', function () {
    $component = remoteForm(fn (FluppyField $field) => $field->importFromUrl());

    expect(callRemoteField($component, 'searchRemoteFiles', ['source' => 'url', 'term' => 'anything']))
        ->toBe(['authenticated' => true, 'error' => 'Files cannot be fetched from there.']);
});

it('lists, finds and copies only what the filter of the field lets through', function () {
    $component = diskForm(filterUsing: fn (string $path, bool $isDirectory): bool => $isDirectory
        ? ! str_ends_with($path, '2026')
        : str_ends_with($path, '.jpg') || str_ends_with($path, '.png'));

    expect(listedOnDisk($component))->toBe([
        ['%2Fphotos', 'photos', true],
        ['%2Flogo.png', 'logo.png', false],
    ]);

    expect(listedOnDisk($component, '%2Fphotos'))->toBe([['%2Fphotos%2Foffice.jpg', 'office.jpg', false]])
        ->and(foundOnDisk($component, 'team'))->toBe([])
        ->and(foundOnDisk($component, 'guide'))->toBe([])
        ->and(foundOnDisk($component, 'office'))->toBe(['%2Fphotos%2Foffice.jpg']);

    expect(callRemoteField($component, 'listRemoteFiles', ['source' => 'disk', 'path' => '%2Fphotos%2F2026']))->toHaveKey('error');

    foreach (['%2FGuide.pdf', '%2Fphotos%2F2026%2Fteam.jpg'] as $file) {
        expect(callRemoteField($component, 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => $file]]))
            ->strategy->toBe('reject');
    }

    expect(callRemoteField($component, 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => '%2Fphotos%2Foffice.jpg']]))
        ->name->toBe('office.jpg');
});

it('gives the filter the path on the disk, and whatever else a closure of the field can ask for', function () {
    $seen = [];

    $component = diskForm(filterUsing: function (string $path, bool $isDirectory, FluppyField $component) use (&$seen): bool {
        $seen[] = [$path, $isDirectory, $component->getName()];

        return true;
    });

    callRemoteField($component, 'listRemoteFiles', ['source' => 'disk']);

    expect($seen)->toContain(['brand/photos', true, 'attachments'], ['brand/logo.png', false, 'attachments']);
});

it('has the server copy a file of the disk, in parts, and stores it whole', function () {
    Storage::disk('library')->put('brand/manual.bin', $contents = random_bytes(3000));

    $component = diskForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => '%2Fmanual.bin']]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('manual.bin')
        ->size->toBe(3000);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save');

    expect(Storage::disk('uploads')->get(collect($component->get('data.attachments'))->first()))->toBe($contents);
});

it('does not copy a folder, a file that is not there, or one outside the folder the field chose', function (string $file) {
    expect(callRemoteField(diskForm(), 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => $file]]))
        ->strategy->toBe('reject');
})->with([
    'a folder' => ['%2Fphotos'],
    'the folder itself' => [''],
    'a missing file' => ['%2Fnothing.txt'],
    'a hidden file' => ['%2F.hidden'],
    'a file elsewhere on the disk' => ['../private/salaries.csv'],
    'the same file, written as a browser would' => ['%2F..%2Fprivate%2Fsalaries.csv'],
    'the same file, by another way' => ['photos/../../private/salaries.csv'],
]);

it('does not list or copy for a field that names no disk', function () {
    $component = remoteForm(fn (FluppyField $field) => $field->importFromUrl());

    expect(callRemoteField($component, 'listRemoteFiles', ['source' => 'disk']))->toHaveKey('error')
        ->and(callRemoteField($component, 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => 'brand/logo.png']]))
        ->strategy->toBe('reject');
});

it('turns a file of the disk away when it is larger than the field allows', function () {
    Storage::disk('library')->put('brand/big.bin', random_bytes(3000));

    $component = remoteForm(fn (FluppyField $field) => $field->importFromDisk('library', 'brand')->maxSize(2));

    expect(callRemoteField($component, 'planRemoteUpload', ['source' => 'disk', 'reference' => ['fileId' => 'big.bin']]))
        ->strategy->toBe('reject')
        ->message->toContain('larger');
});
