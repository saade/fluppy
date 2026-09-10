export default function filamentSkeleton({ state, step }) {
    return {
        state,

        increment() {
            this.state = (this.state ?? 0) + step
        },

        decrement() {
            this.state = (this.state ?? 0) - step
        },
    }
}
