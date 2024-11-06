import axios from 'axios'

interface FileUpload {
  file: File
  folder: string
}

export const uploadFile = async ({ file, folder }: FileUpload) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const unsignedPreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', unsignedPreset)
  formData.append('folder', folder)

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const { data } = await axios.post(cloudinaryUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data.secure_url
}
