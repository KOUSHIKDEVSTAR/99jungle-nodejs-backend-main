const sharp = require('sharp');
const imageBasePath = './public/images';

const createPromiseArray = (imageNameArray) => {
    console.log(imageNameArray);
    let PROMISES_ARRAY = [];

    let featureImage = imageNameArray.filter((item, index)=>{
        if(item.includes('feature')){
            return item;
        }
    });

    const sharpStream = sharp(`${imageBasePath}/${featureImage[0]}`);
    const imageName = featureImage[0].split('.')[0];

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 588 }).jpeg().toFile(`${imageBasePath}/${imageName}_588_28.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 546 }).jpeg().toFile(`${imageBasePath}/${imageName}_546_26.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 504 }).jpeg().toFile(`${imageBasePath}/${imageName}_504_24.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 462 }).jpeg().toFile(`${imageBasePath}/${imageName}_462_22.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 420 }).jpeg().toFile(`${imageBasePath}/${imageName}_420_20.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 378 }).jpeg().toFile(`${imageBasePath}/${imageName}_378_18.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 315 }).jpeg().toFile(`${imageBasePath}/${imageName}_315_15.jpg`));

    PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 210 }).jpeg().toFile(`${imageBasePath}/${imageName}_210_10.jpg`));

    // imageNameArray.forEach((item, index) => {
    //     if(index != 0){            
    //         let imgName = imageNameArray[index].split('.')[0];
    //         console.log(imgName);
    //         PROMISES_ARRAY.push(sharpStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${imgName}_540_720_pd.jpg`));
    //     }
    // });

    imageNameArray.forEach((element, index) => {
        let sStream = sharp(`${imageBasePath}/${imageNameArray[index]}`);
        let iName = imageNameArray[index].split('.')[0];
        PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg().toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    });

    // if(imageNameArray[1]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[1]}`);
    //     let iName = imageNameArray[1].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }
    // if(imageNameArray[2]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[2]}`);
    //     let iName = imageNameArray[2].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }
    // if(imageNameArray[3]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[3]}`);
    //     let iName = imageNameArray[3].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }
    // if(imageNameArray[4]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[4]}`);
    //     let iName = imageNameArray[4].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }
    // if(imageNameArray[5]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[5]}`);
    //     let iName = imageNameArray[5].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }
    // if(imageNameArray[6]){
    //     let sStream = sharp(`${imageBasePath}/${imageNameArray[6]}`);
    //     let iName = imageNameArray[6].split('.')[0];
    //     PROMISES_ARRAY.push(sStream.clone().resize({ width: 540 }).jpeg({ quality: 100 }).toFile(`${imageBasePath}/${iName}_540_720_pd.jpg`));
    // }

    return PROMISES_ARRAY;
}

module.exports = {createPromiseArray};