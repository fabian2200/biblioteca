import { http } from "./http_services";
import axios from 'axios';

export function busqueda($texto, $tipo, $pagina, $grado = 'no', $asignatura = 'no') {
    return http().get('/api/busqueda?textoBusqueda=' + $texto + '&tipoBusqueda=' + $tipo + '&pagina=' + $pagina + '&asignatura=' + $asignatura + '&grado=' + $grado);
}

export function busquedaContenido($id, $tipo) {
    return http().get('/api/busqueda-contenido?id=' + $id + '&tipo=' + $tipo);
}

export function paginacion($texto, $tipo, $pagina, $grado = 'no', $asignatura = 'no') {
    return http().get('/api/paginacion?textoBusqueda=' + $texto + '&tipoBusqueda=' + $tipo + '&pagina=' + $pagina + '&asignatura=' + $asignatura + '&grado=' + $grado);
}

export function paginacionMultimedia($texto, $tipo, $pagina, $grado = 'no', $asignatura = 'no') {
    return http().get('/api/paginacion-multimedia?textoBusqueda=' + $texto + '&tipoBusqueda=' + $tipo + '&pagina=' + $pagina + '&asignatura=' + $asignatura + '&grado=' + $grado);
}

export function verificarConexion() {
    return http().get('/api/check-connection');
}

export function buscarApuntes($id, $tipo) {
    return http().get('/api/busqueda-apunte?id=' + $id + '&tipo=' + $tipo);
}

export async function corregirCadena(textoOriginal) {

    //return http().get('/api/corregir-cadena?cadena=' + textoOriginal);

    try {
        const respuesta = await axios.post('http://192.168.0.199:9000/corregir', {
          texto: textoOriginal
        });

        if (respuesta.data.texto_corregido !== textoOriginal) {
            console.log("Texto Corregido:", respuesta.data.texto_corregido);
            return {
                data: {
                    cadena: respuesta.data.texto_corregido,
                    corregido: true,
                    success: true
                }
            }
        }else{
            console.log("Texto Original es el mismo que el corregido:", textoOriginal);
            return {
                data: {
                    cadena: textoOriginal,
                    corregido: false,
                    success: true
                }
            }
        }
    } catch (error) {
        console.error("Error al conectar con el servidor local:", error);
        return {
            data: {
                cadena: "Error al corregir el texto",
                corregido: false,
                success: false
            }
        }
    }
}