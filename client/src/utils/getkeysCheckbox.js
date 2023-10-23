export const getKeysCheckbox = (objeto) => {
    const clavesTrue = Object.keys(objeto).filter(clave => objeto[clave] === true);
    return clavesTrue
}