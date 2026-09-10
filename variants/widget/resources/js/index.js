export default function filamentSkeleton({ greeting }) {
    return {
        message: '',

        init() {
            this.message = `${greeting} from Alpine`
        },
    }
}
