import { storage } from '../Upload'
import { ref, uploadBytes } from 'firebase/storage'

export const UploadImage = (imageList, path, count, setLeng, id, backPath, index, lastPath) => {
    const image = [...imageList]
    console.log('uploading', image)
    let pathIndex = `${lastPath}`
    if (index > 0) {
        pathIndex = `${index}/${lastPath}`
    }
    for (let i = 0; i < imageList.length; i++) {
        console.log(`Upload`)
        const imageService = ref(storage, `${path}/${id}/${backPath}/${pathIndex}/image-${i}`);
        uploadBytes(imageService, image[i]).then(() => {
            console.log(`Uploaded`)
            setLeng(pre => pre + 1)
        }).catch((e) => {
            console.log('Update image err: ', e)
        })
    }
}