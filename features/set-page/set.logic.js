export let settings = {
    reverseLists: false,
    shuffleLists: true,
};
export function toggleReverseBtn() {
    const newState = settings.reverseLists === true ? false : true;
    settings.reverseLists = newState;
    return newState;
}
export function toggleShuffleLists() {
    const newState = settings.shuffleLists === true ? false : true;
    settings.shuffleLists = newState;
    return newState;
}
