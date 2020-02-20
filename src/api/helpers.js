export function getProperty(source, ...paths) {
    const result = null;
    const origin = source;

    paths.forEach(path => {
       getProperty(origin[path], paths.slice(1))
    });

    return result;
}