'use server'
import {Storage} from '@google-cloud/storage';

export const UploadFileToGoogle = async (form: FormData) => {
    try{
        // action
        const file = form.get('file') as File;
        if(!file) throw new Error('File not found');
        if(file.size < 1) throw new Error('File is empty');

        const buffer = await file.arrayBuffer();
        const storage = new Storage();
        await storage.bucket('the-platform-edu').file(file.name).save(Buffer.from(buffer));

        return true;
    }catch(e){
        console.log(e)
        return false;
    }
}


// export const uploadMakrdownToDB = async (isUpdated : boolean, courseId : string, moduleId : string, values : string) => {
//     console.log('data input: ', values)
//     try{
//         if(isUpdated){
//             const response = await fetch(`/api/courses/${courseId}/courseModules/${moduleId}`, { method: "POST", body: JSON.stringify(values) })
//             return response;
//         }else{
//             const response = await fetch(`/api/courses/${courseId}/courseModules/${moduleId}`, { method: "PATCH", body: JSON.stringify(values) })
//             return response.ok ? true : false;
//         }
//     }catch(e){
//         console.log('[Makrdown upload error] ', e)
//         return false;
//     }
//     return true;
// }

