// Each is a chunk of its own, loaded only by a field that has it on.
const sources = {
    camera: () => import('@uppy/webcam'),
    microphone: () => import('@uppy/audio'),
    screenCapture: () => import('@uppy/screen-capture'),
}

const isOnly = (acceptedFileTypes, kind) =>
    Boolean(acceptedFileTypes?.length) &&
    acceptedFileTypes.every((type) => type.startsWith(`${kind}/`))

/**
 * Adds to Uppy the places, other than the device's files, a file can come
 * from. The Dashboard shows each as a button of its own.
 */
export async function useSources(uppy, names, { acceptedFileTypes }) {
    for (const name of names.filter((name) => name in sources)) {
        const { default: Source } = await sources[name]()

        uppy.use(
            Source,
            // A field for images has no use for a video of the camera, nor
            // one for videos for a picture.
            name === 'camera' && isOnly(acceptedFileTypes, 'image')
                ? { modes: ['picture'] }
                : name === 'camera' && isOnly(acceptedFileTypes, 'video')
                  ? { modes: ['video-audio'] }
                  : {},
        )
    }
}
