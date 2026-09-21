const isAbout = (ratio, target) => Math.abs(ratio - target) < 0.01

/**
 * Uppy's editor only crops to a square, 16:9 or 9:16, so those are the
 * shapes a field can choose among; any other it lists is left out.
 */
export async function useImageEditor(uppy, { aspectRatios, fixedAspectRatio }) {
    const { default: ImageEditor } = await import('@uppy/image-editor')

    const offers = (target) =>
        !fixedAspectRatio &&
        (!aspectRatios.length ||
            aspectRatios.some((ratio) => isAbout(ratio, target)))

    uppy.use(ImageEditor, {
        actions: {
            cropSquare: offers(1),
            cropWidescreen: offers(16 / 9),
            cropWidescreenVertical: offers(9 / 16),
        },
        cropperOptions: fixedAspectRatio
            ? { aspectRatio: fixedAspectRatio }
            : {},
    })
}

/**
 * Uppy only offers to edit a file before it is sent. Here a file is sent as
 * soon as it is chosen, so it is edited afterwards.
 */
export function isEditable(uppy, file) {
    return Boolean(
        file.progress.uploadComplete &&
            uppy.getPlugin('ImageEditor')?.canEditFile(file),
    )
}
