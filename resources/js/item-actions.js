const icons = {
    download:
        '<svg aria-hidden="true" focusable="false" class="uppy-c-icon" width="14" height="14" viewBox="0 0 20 20"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z"/><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/></svg>',
    edit: '<svg aria-hidden="true" focusable="false" class="uppy-c-icon" width="14" height="14" viewBox="0 0 20 20"><path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z"/></svg>',
}

/**
 * Uppy's Dashboard has no way to be given more buttons for a file. The
 * field's own are put next to Uppy's in the page, and put back whenever
 * Uppy draws the file again.
 *
 * `getActions(file)` answers with `{ name, label, onClick }` for a button
 * or `{ name, label, href }` for a link.
 */
export function useItemActions(uppy, dashboard, getActions) {
    const sync = () => {
        dashboard.querySelectorAll('.uppy-Dashboard-Item').forEach((item) => {
            const file = uppy.getFile(item.id.replace(/^uppy_/, ''))
            const wrapper = item.querySelector('.uppy-Dashboard-Item-actionWrapper')

            if (!file || !wrapper) {
                return
            }

            const actions = getActions(file)
            const signature = actions
                .map(({ name, href }) => `${name}:${href ?? ''}`)
                .join('|')

            const shown = [...wrapper.querySelectorAll('[data-fluppy-action]')]

            if (
                wrapper.dataset.fluppyActions === signature &&
                shown.length === actions.length
            ) {
                return
            }

            shown.forEach((element) => element.remove())

            wrapper.dataset.fluppyActions = signature
            wrapper.prepend(...actions.map((action) => render(action, file)))
        })
    }

    const render = ({ name, label, href, onClick }, file) => {
        const element = document.createElement(href ? 'a' : 'button')

        element.className =
            'uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit'
        element.dataset.fluppyAction = name
        element.title = label
        element.setAttribute('aria-label', label)
        element.innerHTML = icons[name]

        if (href) {
            element.href = href
            element.download = file.name
            element.target = '_blank'
            element.rel = 'noopener noreferrer'
        } else {
            element.type = 'button'
            element.addEventListener('click', () => onClick(file.id))
        }

        return element
    }

    let isScheduled = false

    // Uppy changes its state many times in a row; once a frame is enough.
    const schedule = () => {
        if (isScheduled) {
            return
        }

        isScheduled = true

        requestAnimationFrame(() => {
            isScheduled = false
            sync()
        })
    }

    const observer = new MutationObserver(schedule)

    observer.observe(dashboard, { childList: true, subtree: true })
    uppy.on('state-update', schedule)

    return () => observer.disconnect()
}
