<?php

namespace Saade\Fluppy\Sources;

use Closure;

/**
 * The remote sources the application knows, by id. The package registers
 * its own; an application adds more with `extend()`, usually from a service
 * provider:
 *
 *     app(SourceManager::class)->extend('box', fn () => new BoxSource);
 */
class SourceManager
{
    /**
     * @var array<string, Closure(): Source>
     */
    protected array $resolvers = [];

    /**
     * @var array<string, Source>
     */
    protected array $sources = [];

    /**
     * @param  Closure(): Source  $resolver
     */
    public function extend(string $id, Closure $resolver): static
    {
        $this->resolvers[$id] = $resolver;

        unset($this->sources[$id]);

        return $this;
    }

    public function has(string $id): bool
    {
        return isset($this->resolvers[$id]);
    }

    public function get(string $id): ?Source
    {
        if (! $this->has($id)) {
            return null;
        }

        return $this->sources[$id] ??= ($this->resolvers[$id])();
    }
}
