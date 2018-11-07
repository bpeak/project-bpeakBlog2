import fs from 'fs'
import path from 'path'

const preUploadPostImgFile = async (req, res) => {
    try{
        const { file } = req
        if(!file){ return res.sendStatus(500) }
        const fileName = Date.now() + '-' + file.originalname
        const imgTempSrc = `/public/temporary/postImgs/${fileName}`
        const uploadPath = path.join(__rootDir, '../../', imgTempSrc)
        
        fs.writeFileSync(uploadPath, file.buffer, "binary")
        return res.status(201).json(JSON.stringify({ imgTempSrc }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export default preUploadPostImgFile