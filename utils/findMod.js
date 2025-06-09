export default function findMod(mod, mods) {
    return mods?.find(el => el.id === mod)
}