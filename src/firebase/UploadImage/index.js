import { storage } from '../Config'
import { ref, uploadBytes } from 'firebase/storage'

export const UploadImage = (imageList, path, count, setLeng, id, backPath, index, lastPath) => {
    const image = [...imageList]
    let pathIndex = `${lastPath}`
    if (index > 0) {
        pathIndex = `${index}/${lastPath}`
    }
    for (let i = 0; i < imageList.length; i++) {
        const imageService = ref(storage, `${path}/${id}/${backPath}/${pathIndex}/image-${i}`);
        uploadBytes(imageService, image[i]).then(() => {
            setLeng(pre => pre + 1)
        }).catch((e) => {
        })
    }
}