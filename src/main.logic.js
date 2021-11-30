'use static'

import {
    readFileSync
} from 'fs'

const readFile = (filepath) => {
    const file = readFileSync(filepath, {
        encoding: 'utf8'
    });

    return file;
};

const parseJson = (file) => {
    if (typeof file !== 'object') {
        file = JSON.parse(file);
    }
    return file;
}

const validate = (data) => {
    if (data.ResourceTagMappingList) {
        return true;
    }
    return false;
}

const splitResource = (resource) => {
    resource = resource.split(':')
    return resource
}

const run = (path) => {

    const resourceList = {
        users: {}
    };

    console.log('Starting.');

    let data = readFile(path);
    data = parseJson(data);

    if (!validate(data)) {
        console.log('Data is not vaild');
        return;
    }
    console.log('File is vaild');

    data = data.ResourceTagMappingList;

    for (let i = 0; i < data.length; i++) {

        let currentResource = splitResource(data[i].ResourceARN);
        let currentResourceTags = data[i].Tags;

        if (!resourceList.users[currentResource[4]]) {

            resourceList.users[currentResource[4]] = {
                region: {}
            };

        };

        if (!resourceList.users[currentResource[4]].region[currentResource[3]]) {
            resourceList.users[currentResource[4]].region[currentResource[3]] = { types: {} };
        }


        if (!resourceList.users[currentResource[4]].region[currentResource[3]].types[currentResource[2]]) {
            resourceList.users[currentResource[4]].region[currentResource[3]].types[currentResource[2]] = [];
        }


        const resourceNode = {
            name: '',
            tags: []
        }

        if (currentResource[2] == 'cloudwatch') {
            resourceNode.name = currentResource[6];
            resourceNode.tags.push({ subtype: currentResource[5] })
        } else {
            resourceNode.name = currentResource[5];
            resourceNode.tags = currentResourceTags;
        }

        resourceList.users[currentResource[4]].region[currentResource[3]].types[currentResource[2]].push(resourceNode)


    }

    return resourceList;
};

export default run;