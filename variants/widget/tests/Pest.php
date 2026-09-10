<?php

use Saade\FilamentSkeleton\Tests\Fixtures\User;
use Saade\FilamentSkeleton\Tests\StandaloneTestCase;
use Saade\FilamentSkeleton\Tests\TestCase;

uses(TestCase::class)
    ->beforeEach(fn () => $this->actingAs(User::create(['name' => 'Admin', 'email' => 'admin@example.com'])))
    ->in('Feature');

uses(StandaloneTestCase::class)
    ->beforeEach(fn () => $this->actingAs(User::create(['name' => 'Admin', 'email' => 'admin@example.com'])))
    ->in('Standalone');
