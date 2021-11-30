import run from './src/main.logic.js'
import { writeFileSync } from 'fs';
const args = process.argv;

if (Array.isArray(args) == true) {
    const fileFlagIndex = args.indexOf('-f')
    if (fileFlagIndex > -1) {

        const pathArg = args[fileFlagIndex + 1];

        if (pathArg) {

            writeFileSync('./reports/' + Date.now() + '.json', JSON.stringify(run(pathArg)));

        } else {
            console.log('file path is not supplied \nPlease use "-f <file path>" to use.')
        }

    } else {
        console.log('Please use "-f <file path>" to use.')
    }
}