const fs = require('fs')

// input values here
let whatToGenerate = {
    // users: 1, // always 1
    collections: 1,
    cronsPerCollection: 5,
    socialUnitsPerSocialNetwork: 5
}





function generateRandomNumber(index, lastDigits, format) {
    let idArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    idArray.unshift(index);
    let lastDigitsArray = ("" + lastDigits).split("")


    if (lastDigitsArray.length === 1) {
        let correct = '000' + lastDigits
        idArray.push(correct)
    } else if (lastDigitsArray.length === 2) {
        let correct = '00' + lastDigits
        idArray.push(correct)
    } else if (lastDigitsArray.length === 3) {
        let correct = '0' + lastDigits
        idArray.push(correct)
    } else if (lastDigitsArray.length === 4) {
        let correct = lastDigits
        idArray.push(correct)
    } else if (lastDigitsArray.length >= 5) {
        idArray.push('blogasidddddddddddddddd')
    }
    let id = idArray.join('');

    if (format == undefined) {
        return id
    }

    if (format) {
        let formatedId = `ObjectId('${id}')`
        return formatedId
    }
}



function generateCollection(id, user, cronList, socialNetworkList) {
    return {
        _id: id,
        userId: user,
        cronList: cronList,
        socialNetworkList: socialNetworkList
    }
}


function cronUnitGenerate(id, content, imageUrl, postOn, collectionId) {
    return {
        _id: id,
        content: content,
        imageUrl: imageUrl,
        postOn: postOn,
        collectionId: collectionId
    }
}

function socialNetworkGenerate(id, name, socialNetworkAccountId, socialUnitsList, socialNetworkType, picture, userId, expireOn, accessToken) {
    return {
        _id: id,
        name: name,
        socialNetworkAccountId: socialNetworkAccountId,
        socialUnitsList: socialUnitsList,
        type: socialNetworkType,
        picture: picture,
        userId: userId,
        expireOn: expireOn,
        accessToken: accessToken
    }
}

function generateUser(id, username, picture, verified, collectionList, socialNetworkList) {
    return {
        id: id,
        username: username,
        picture: picture,
        verified: verified,
        collectionList: collectionList,
        socialNetworkList: socialNetworkList
    }
}



let cronStorage = []
let socialNetworkStorage = [];
let socialUnitsStorage = [];
let usersStorage = [];


function collection(howManyCollections, howManyCrons, howManySocialUnits) {
    let user = generateRandomNumber(2, 1, true)
        /* let userId = generateRandomNumber(2, 1, true)
        let userUsername = 'Eimantas'
        let userPicture = ':)'
        let userVerified = 'yes'
        let userCollectionList = []
        let userSocialNetworkList = []
        let user = userToUsersStorage(userId, userUsername, userPicture, userVerified, userCollectionList, userSocialNetworkList) */

    let collections = [];
    let cronList = [];
    let socialNetworkList = [
        'FACEBOOK',
        'TWITTER'
    ];

    for (let i = 0; i < howManyCollections; i++) {
        let id = generateRandomNumber(1, i, true)
        let crons = []
        for (let y = 0; y < howManyCrons; y++) {
            let cronId = generateRandomNumber(3, y, true);
            crons.push(cronId);
        }
        cronList = crons;
        let newCollection = generateCollection(id, user, cronList, socialNetworkList);
        collections.push(newCollection)
    }




    // CRON ATSKIRAI ARRAY
    for (let collectionCount in collections) {
        for (let cron in cronList) {
            let cronId = generateRandomNumber(3, cron, true)
            let cronContent = 'content'
            let cronImage = 'url'
            let postOnNumber = makeid(12);
            let cronPostOn = new Date(parseInt(postOnNumber)).toISOString()
            let cronCollectionId = generateRandomNumber(1, collectionCount, true);
            cronListToStorage(cronId, cronContent, cronImage, cronPostOn, cronCollectionId)
        }
    }


    // SOCIALNETWORK ATSKIRAI ARRAY
    for (let i = 0; i < howManySocialUnits; i++) {
        let unitId = generateRandomNumber(6, i, true)
        socialUnitsStorage.push(unitId);
    }

    for (let socialNetwork in socialNetworkList) {
        let socialId = generateRandomNumber(4, socialNetwork, true)
        let socialName = socialNetworkList[socialNetwork];
        let socialNetworkAccountId = generateRandomNumber(5, 0, true)
        let socialNetworkType = 'type'
        let socialPicture = 'pic'
        let socialUserId = user
        let postOnNumber = makeid(12);
        let socialExpireOn = new Date(parseInt(postOnNumber)).toISOString()
        let socialAccessToken = 'token'




        socialNetworkToStorage(socialId, socialName, socialNetworkAccountId,
            socialUnitsStorage, socialNetworkType, socialPicture, socialUserId, socialExpireOn, socialAccessToken)

    }









    // ISDAVIMAS
    console.log('')
    console.log('________________COLLECTIONS________________')
    console.log('')
    console.log(collections); // atiduoda kolekcijas
    console.log('')
    console.log('________________CRONS________________')
    console.log('')
    console.log(cronStorage) // atiduoda cron'u lista
    console.log('')
    console.log('________________NETWORKS________________')
    console.log('')
    console.log(socialNetworkStorage) // atiduoda lista soc unitu
    console.log('')
    console.log('________________UNITS________________')
    console.log('')
    console.log(socialUnitsStorage) // atiduoda unit'u lista




    let giveCollections = JSON.stringify(collections)
    let giveCrons = JSON.stringify(cronStorage)
    let giveNetworks = JSON.stringify(socialNetworkStorage)
    let giveUnits = JSON.stringify(socialUnitsStorage)
    fs.writeFileSync('collections.json', giveCollections);
    fs.writeFileSync('crons.json', giveCrons);
    fs.writeFileSync('networks.json', giveNetworks);
    fs.writeFileSync('units.json', giveUnits);

}



function cronListToStorage(id, content, imageUrl, postOn, collectionId) {
    let unit = cronUnitGenerate(id, content, imageUrl, postOn, collectionId)
    cronStorage.push(unit)
}


function socialNetworkToStorage(
    id,
    name,
    socialNetworkAccountId,
    socialUnitsList,
    socialNetworkType,
    picture,
    userId,
    expireOn,
    accessToken) {
    let unit = socialNetworkGenerate(id,
        name,
        socialNetworkAccountId,
        socialUnitsList,
        socialNetworkType,
        picture,
        userId,
        expireOn, accessToken)

    socialNetworkStorage.push(unit)
}

function userToUsersStorage(
    id,
    username,
    picture,
    verified,
    collectionList,
    socialNetworkList) {
    let user = generateUser(id, username, picture, verified, collectionList, socialNetworkList)
    usersStorage.push(user)
}

function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// leidimas




collection(whatToGenerate.collections, whatToGenerate.cronsPerCollection, whatToGenerate.socialUnitsPerSocialNetwork)