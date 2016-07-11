export default function deferWire(config) {
    return (target, name, description) => {
        return {
            value: {
                wire: {
                    spec: config.spec,
                    defer: true
                }
            }
        }
    }
}