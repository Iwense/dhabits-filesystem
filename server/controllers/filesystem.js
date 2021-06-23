import fs from 'fs'
import path from 'path';

const mainPath = './filesystem/';
const fileSystem = {
    children: [],
    id: 0,
    title:"root",
}

const createFileSystem = (inputFolder) => {
    const result = []
    const files = fs.readdirSync(inputFolder)

    files.forEach(file => {
        const dirContent = path.resolve(inputFolder, file);
        if (fs.statSync(dirContent).isDirectory()) {
            const newDir = {
                id: Date.now().toString(),
                title: file,
                children: [...createFileSystem(dirContent)]
            }
            console.log("NewDir = ", newDir)
            result.push(newDir)
        }
        if (fs.statSync(dirContent).isFile()) {
            const newFile = {
                id: Date.now().toString(),
                title: file,
            }
            result.push(newFile)
        }
    });

    return result
}
console.log("everu time")
fileSystem.children.push(...createFileSystem(mainPath))




// const fileSystem = {
//     children: [
//         {id: 1, title: 'Site', children: [
//             {id: 2123, title: 'index.js'},
//             {id: 3123, title: 'style.css'},
//             {id: 1111, title: 'Site', children: [
//                 {id: 22123, title: 'index.js'},
//                 {id: 31323, title: 'style.css'},
//             ]},
//         ]},
//         {id: 2, title: 'Web', children: [
//             {id: 2123, title: 'index.js'},
//             {id: 3123, title: 'style.css'},
//             {id: 15654, title: 'Empty', children: []}
//         ]},
//     ],
//     id: 0,
//     title:"root"
// }

const findID = (array = [], id) => {
    let result;
    array.some(o => result = o.id === id ? o : findID(o.children || [], id));
    return result;
  };

export const getRoot = (req, res) => {
    res.status(200).json(fileSystem)
}

export const getFolders = (req, res) => {
    console.log("Filesystem in Get Folders = ", fileSystem)
    const newResponse = findID(fileSystem.children, req.params.id)
    console.log("newResponse = ", newResponse)
    res.status(200).json(newResponse)   
}
