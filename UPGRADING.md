# Upgrading

There is nothing to upgrade from yet. When a major version changes how existing code behaves, write its guide here, in this shape:

## What to expect

One sentence on requirements, then a small table: how many required changes, how many behavior changes, how many deprecations.

## Installing

The Composer command, and anything that happens right after it that would surprise someone (an error that is expected, assets to publish).

## Required changes

A table of the steps and when each applies, then one section per step. Each step is something that breaks until it is done.

### Step 1: The change, as an instruction

What changed and why, then a diff:

```diff
-public function before(array $info): array
+public function after(Info $info): array
```

## Behavior changes

A linked list, then one section per change. Nothing here stops the code from loading, but each changes what an existing installation does.

## Deprecations

What still works but will be removed, each with a diff to the replacement.
