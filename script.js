function borrarTextoCajaResultado(){
    let divSinTexto = document.querySelector('.sin_texto')

    if (divSinTexto == null){
        
    }else{
        divSinTexto.remove();
    }
}

function limpiarCajaTextoResultado(){
    let divConTexto = document.querySelector('.con_texto')
    if (divConTexto == null){
        
    }else{
        divConTexto.remove();
    }
}

function validaciones(textoUsuario){

    // Expresión regular para caracteres especiales
    const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>-_]/;

    // Verifica si hay mayúsculas, caracteres acentuados o caracteres especiales
    if (/[A-Z]/.test(textoUsuario) || 
        (/[\u0300-\u036f]/.test(textoUsuario.normalize('NFD'))) || 
        caracteresEspeciales.test(textoUsuario)) {
        return true;
    }
    return false;
}

function encriptarTexto(){
    // Funcion para  limpiar la caja de texto encriptado
    limpiarCajaTextoResultado();

    // Obtención del valor del texto ingresado por el usuario
    let textoUsuario = document.getElementById('texto_usuario').value;

    if (validaciones(textoUsuario)) {
        alert('El texto no debe contener mayúsculas, tildes ni caracteres especiales.');
        return;
    }

    //Verificar que el texto no contenga mayusculas ni tildes

    let textoEncriptado = '';
    let cajaTextoEncriptado = document.querySelector('.caja_texto_encriptado')

    // Verificación si el texto a encriptar está vacío
    if (parseInt(textoUsuario.length) <= 0){
        alert("No hay texto para encriptar")
    }else{
        borrarTextoCajaResultado();
        for (let i = 0; i<textoUsuario.length; i++){
            
            textoEncriptado += textoUsuario[i];
            
            switch(textoUsuario[i]){
                case 'a':
                    textoEncriptado += 'i';//ai
                    break;
                case 'e':
                    textoEncriptado += 'nter';//enter
                    break;
                case 'i':
                    textoEncriptado += 'mes';//imes
                    break;
                case 'o':
                    textoEncriptado += 'ber';//ober
                    break;
                case 'u':
                    textoEncriptado += 'fat';//ufat
                    break;
            }
            
        }
        console.log("Texto encriptado:",textoEncriptado);
    }
    
    // Inserción del texto desencriptado en la caja de texto desencriptado
    cajaTextoEncriptado.innerHTML += `
        <div class="con_texto">
            <p class="parrafo_texto_resultado">${textoEncriptado}</p>
        </div>
        `;
    
    document.getElementById('texto_usuario').value ='';
}

function desencriptarTexto() {
    // Funcion para  limpiar la caja de texto desencriptado
    limpiarCajaTextoResultado();

    // Obtención del valor del texto ingresado por el usuario
    let textoEncriptado = document.getElementById('texto_usuario').value;
    
    if (validaciones(textoEncriptado)) {
        alert('El texto no debe contener mayúsculas, tildes ni caracteres especiales.');
        return;
    }

    let textoDesencriptado = '';
    let cajaTextoDesencriptado = document.querySelector('.caja_texto_encriptado');

    // Verificación si el texto encriptado está vacío
    if (textoEncriptado.length <= 0) {
        alert("No hay texto para desencriptar");
    } else {
        borrarTextoCajaResultado();
        // Desencriptar el texto utilizando replace con expresiones regulares
        textoDesencriptado = textoEncriptado
            .replace(/ai/g, 'a')
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
    }

    // Inserción del texto desencriptado en la caja de texto desencriptado
    cajaTextoDesencriptado.innerHTML += `
        <div class="con_texto">
            <p class="parrafo_texto_resultado">${textoDesencriptado}</p>
        </div>
    `;

    document.getElementById('texto_usuario').value ='';
}

function copiarTexto(){
    let textoACopiar = document.querySelector('.parrafo_texto_resultado').textContent;

    // Crear un elemento de texto temporal para poder copiar el texto
    let textArea = document.createElement("textarea");
    textArea.value = textoACopiar;
    document.body.appendChild(textArea);

    // Seleccionar el texto y copiarlo al portapapeles
    textArea.select();
    document.execCommand('copy');

    // Remover el elemento temporal
    document.body.removeChild(textArea);

    alert("Texto copiado")
}