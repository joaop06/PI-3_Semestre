import { ImageResize } from "quill-image-resize";

function quillImageResize(quill) {
    const ImageFormat = quill.import('formats/image');
    const BaseImageFormat = ImageFormat.prototype;
    
    class CustomImageFormat extends ImageFormat {
      format(name, value) {
        if (name === 'src' && value) {
          // Redimensione a imagem aqui para o tamanho desejado (por exemplo, 300x200 pixels)
          const maxWidth = 300;
          const maxHeight = 200;
  
          const img = new Image();
          img.src = value;
          
          if (img.width > maxWidth || img.height > maxHeight) {
            const ratio = img.width / img.height;
            const newWidth = Math.min(img.width, maxWidth);
            const newHeight = Math.min(img.height, maxHeight);
  
            this.domNode.width = newWidth;
            this.domNode.height = newHeight;
  
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
  
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
            this.domNode.src = canvas.toDataURL('image/jpeg');
          }
        }
        
        super.format(name, value);
      }
    }
    
    quill.register(CustomImageFormat, true);
  }

  export default quillImageResize;