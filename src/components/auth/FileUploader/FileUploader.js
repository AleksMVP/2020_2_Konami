import EventBus from "../../../js/services/EventBus/EventBus.js";
import {BIG_FILE_SIZE} from "../../../js/services/EventBus/EventTypes.js";
import {sanitizeHTML} from "@/js/utils/validators/simpleSanitize";

const MAX_INPUT_FILE_SIZE = 8;

export function createFileUploader(id) {
    const fileUploader = document.createElement('div');
    fileUploader.innerHTML = `<input accept="image/*" type="file" name="photos" id=${id} class="inputfile" data-multiple-caption="{count} files selected" multiple="">`
    fileUploader.innerHTML += `<label for=${id}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"> 
        <path d='M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z'>
        </path></svg> <span>Выберите файл…</span></label>`

    return fileUploader;
}

export function createFileUploaderWithImg(id, img) {
    const fileUploader = document.createElement('div');
    fileUploader.innerHTML = `<input accept="image/*" type="file" name="photos" id=${id} class="inputfile" data-multiple-caption="{count} files selected" multiple="">`
    fileUploader.appendChild(img)
    fileUploader.innerHTML += `<label for=${id}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"> 
        <path d='M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z'>
        </path></svg> <span>Выберите файл…</span></label>`

    return fileUploader;
}

export function inputFileChangedEventListener() {
    const inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input ) {
        const img	 = input.nextElementSibling;
        let label	 = img.tagName === 'IMG' ? img.nextElementSibling : img;
        const labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            let fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName ) {
                const filesize = (e.target.files[0].size/1024/1024).toFixed(4); // MB
                if (filesize > MAX_INPUT_FILE_SIZE) {
                    EventBus.dispatchEvent(BIG_FILE_SIZE);
                    return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    img.src = reader.result;
                }

                label.querySelector( 'span' ).innerHTML = sanitizeHTML(fileName);

            } else
                label.innerHTML = labelVal;
        });
    });
}
