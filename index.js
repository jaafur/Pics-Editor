let wrapper = document.querySelector(".wrapper")
let editor = document.querySelector(".editor")
let imageContainer = document.querySelector(".img-container")
let img = document.querySelector(".img")
let optionBtns = document.querySelector(".option-btns")
let fileInput = document.querySelector("#file")
let openLabel = document.querySelector("label")
let rotateLeftBtn = document.querySelector(".rotate-left")
let rotateRightBtn = document.querySelector(".rotate-right")
let scaleX = document.querySelector(".scale-x")
let scaleY = document.querySelector(".scale-y")
let aspectRatios = document.querySelectorAll(".aspect-ratio-btn")
let previwBtn = document.querySelector(".preview")
let downloadBtn = document.querySelector(".download")
let previewImage = document.querySelector('.preview-image')
let cropper = ""
let leftDegree = -45
let rightDegree = 45
let scaleXDegree = false
let scaleYDegree = false 
let fileName = ""

fileInput.onchange = ()=>{
    let reader = new FileReader()
    reader.readAsDataURL(fileInput.files[0])
    reader.onload = ()=>{
        if (cropper) {
            cropper.destroy()
        }
        img.setAttribute('src',reader.result)
         cropper = new Cropper(img)
        optionBtns.classList.remove("hide")
        previwBtn.classList.remove("hide")
    }
    fileName = fileInput.files[0].name.split(".")[0]
}
aspectRatios.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText == "Free") {
            
          cropper.setAspectRatio(NaN);
        } else {
          cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
        }
      });
})
rotateLeftBtn.addEventListener('click',()=>{
    cropper.rotate(leftDegree)
})
rotateRightBtn.addEventListener('click',()=>{
    cropper.rotate(rightDegree)
})
scaleX.addEventListener('click',()=>{
  if (scaleXDegree) {
    cropper.scaleX(1)
    scaleXDegree = false
  }else{
    cropper.scaleX(-1)
    scaleXDegree = true
  }
})
scaleY.addEventListener('click',()=>{
  if (scaleYDegree) {
    cropper.scaleY(1)
    scaleYDegree = false
  }else{
    cropper.scaleY(-1)
    scaleYDegree = true
  }
})
previwBtn.addEventListener('click',()=>{
  downloadBtn.classList.remove('hide')
  let imgSrc = cropper.getCroppedCanvas({}).toDataURL()
  previewImage.setAttribute('src',imgSrc)
})
downloadBtn.addEventListener('click',()=>{
  href = cropper.getCroppedCanvas({}).toDataURL() 
  downloadBtn.download = `cropped_${fileName}.png`
  downloadBtn.setAttribute('href',href)
})
