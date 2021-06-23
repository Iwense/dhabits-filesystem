import fs from 'fs'
import path from 'path';

const mainPath = './filesystem/';
const fileSystem = {
    children: [],
    id: 1,
    title:"root",
}

const createFileSystem = (inputFolder) => {
    const result = []
    const files = fs.readdirSync(inputFolder)

    files.forEach(file => {
        const dirContent = path.resolve(inputFolder, file);
        if (fs.statSync(dirContent).isDirectory()) {
            const newDir = {
                id: Date.now() + Math.floor(Math.random() * 10),
                title: file,
                children: [...createFileSystem(dirContent)]
            }
            result.push(newDir)
        }
        if (fs.statSync(dirContent).isFile()) {
            const newFile = {
                id: Date.now() + Math.floor(Math.random() * 10),
                title: file,
            }
            result.push(newFile)
        }
    });

    return result
}

const findID = (array = [], id) => {
    let result;
    array.some(o => result = o.id === id ? o : findID(o.children || [], id));
    return result;
  };

export const getRoot = async (req, res) => {
    fileSystem.children = await createFileSystem(mainPath)
    res.status(200).json(await fileSystem)
}

export const getFolders = (req, res) => {
    const newResponse = findID(fileSystem.children, +req.params.id)
    res.status(200).json(newResponse)   
}
