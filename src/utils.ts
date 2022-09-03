export function getTransitions(dir:boolean) {
    return dir ? {
        "in": {
            y: -600,
            durration: 1500
        },
        "out": {
            y: 400,
            durration: 1000
        }
    } : {
        "in": {
            y: 600,
            durration: 1500
        },
        "out": {
            y: -400,
            durration: 1000
        }
    };
}