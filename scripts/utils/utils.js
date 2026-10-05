export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function degToRad(degree) {
    return degree * (Math.PI / 180);
}

export function isColliding(obj1, obj2) {
    return (
        obj1.positiveAngle() >= obj2.positiveAngle() - (obj2.width / 2) &&
        obj1.positiveAngle() <= obj2.positiveAngle() + (obj2.width / 2)
    );
}