import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import {
  FaUpload
} from '@components/icon/IconImage'

interface UploadFormProps {
    returnVal: () => void
}

const UploadForm = () => {
  
    const init = () => {

        var fileSelect    = document.getElementById('file-upload'),
            fileDrag      = document.getElementById('file-drag')

        fileSelect?.addEventListener('change', fileSelectHandler, false)

        fileDrag?.addEventListener('dragover', fileDragHover, false)
        fileDrag?.addEventListener('dragleave', fileDragHover, false)
        fileDrag?.addEventListener('drop', fileSelectHandler, false)
    }

    const fileDragHover = (e: any) => {
        var fileDrag = document.getElementById('file-drag')
    
        e.stopPropagation()
        e.preventDefault()
    
        fileDrag!.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload')
    }

    const fileSelectHandler = (e: any) => {
        // Fetch FileList object
        var files = e.target.files || e.dataTransfer.files
    
        // Cancel event and hover styling
        fileDragHover(e)
    
        // Process all File objects
        for (var i = 0, f; f = files[i]; i++) {
          parseFile(f)
          uploadFile(f)
        }
    }

    const parseFile = (file: any) => {

        var imageName = file.name
    
        var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName)
        if (isGood) {
          document.getElementById('start')!.classList.add("hidden")
          document.getElementById('response')!.classList.remove("hidden")
          document.getElementById('notimage')!.classList.add("hidden")
          // Thumbnail Preview
          var fileImgEle = document.getElementById('file-image') 
          fileImgEle!.classList.remove("hidden")
          fileImgEle!.src = URL.createObjectURL(file)
        }
        else {
          document.getElementById('file-image')?.classList.add("hidden")
          document.getElementById('notimage')?.classList.remove("hidden")
          document.getElementById('start')?.classList.remove("hidden")
          document.getElementById('response')?.classList.add("hidden")
          document.getElementById("file-upload-form")!.reset()
        }
    }

    
    const uploadFile = (file: any) => {
        var formData = new FormData()
        console.log(file)
        formData.append('file', file)
        axios({
          method: 'post',
          url: `/api/upload`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        .then(res => {
            console.log(res)
            // returnVal("res.data.data")
        })
          .catch(error => console.log(error))
          
        return
        
    }


    useEffect(() => {
        init()
    }, [])


    return (
        <>
            <form id="file-upload-form" 
                className="uploader flex flex-col mx-auto w-9/12 p-3 bg-transparent border-dashed border-2 rounded-xl">
                <input id="file-upload" className="hidden" type="file" name="fileUpload" accept="image/*" />

                <label htmlFor="file-upload" id="file-drag">
                    <img id="file-image" src="#" alt="Preview" className="hidden" />
                    <div id="start" className="flex flex-col justify-center">
                        <FaUpload className='text-4xl mx-auto mb-4 cursor-pointer' />
                        <div className="text-center">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</div>
                        <div id="notimage" className="hidden">Please select an image</div>
                    </div>
                    <div id="response" className="hidden">
                    </div>
                </label>
            </form>
        </>
    )
}


export default UploadForm