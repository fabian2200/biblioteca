<template lang="">
    <div>
        <div id="colores" class="colores">
          <div id="coloresesconder" @click="escondermostrar">
            <i class="fas fa-angle-double-left" style="color: #7e7f81;"></i>
          </div>
          <div class="color" id="color1" @click="seleccionarcolor(1)"></div>
          <div class="color" id="color2" @click="seleccionarcolor(2)"></div>
          <div class="color" id="color3" @click="seleccionarcolor(3)"></div>
          <div class="color" id="color4" @click="seleccionarcolor(4)"></div>
          <div class="color" id="color5" @click="seleccionarcolor(5)"></div>
        </div>
        <div class="app-content container center-layout mt-2" style="max-width: 80%;">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style="padding: 0.8rem">
                
                <div class="content-body">
                    <!-- Search form-->
                    <section id="search-website" class="card overflow-hidden">
                        <div class="card-header">
                            <h4 class="card-title">Contenido encontrado</h4>
                            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                            <div class="heading-elements">
                                <ul class="list-inline mb-0">
                                    <li data-toggle="tooltip" data-placement="top" title="Retroceder"><a @click="goBack"><i class="fa-2x fas fa-arrow-left"></i></a></li>
                                    <li data-toggle="tooltip" data-placement="top" title="Compartir"  v-if="sessionData.tipo_registro == 'docente'"><a type="button"  data-toggle="modal" data-target="#modalCompartir"><i class="fa-2x fas fa-share-alt"></i></a></li>
                                    <li data-toggle="tooltip" data-placement="top" title="Crear Foro" v-if="sessionData.tipo_registro == 'docente'"><a type="button"  data-toggle="modal" data-target="#modalForo"><i class="fa-2x fas fa-comments"></i></a></li>
                                    <li data-toggle="tooltip" data-placement="top" title="Marcar como favorito"><a @click="agregarFavorito"><i :class="favorito == true ? 'fas fa-star fa-2x' : 'fa-2x far fa-star'" :style="favorito ? 'color: #009c9f' : 'color: #404e67'"></i></a></li>
                                    <!-- <li data-toggle="tooltip" data-placement="top" title="Resumir"><a type="button" @click="mostrarChatLateral()"><i class="fa-2x fas fa-file-alt"></i></a></li> -->   
                                    <li data-toggle="tooltip" data-placement="top" title="Maximizar"><a data-action="expand"><i class="fa-2x fas fa-compress"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-content collapse show">
                            <div id="search-results" class="card-body">
                                <div style="width: 100%;">
                                    <Skeleton v-if="loading"></Skeleton>
                                </div>
                                <div id="content" v-html="contenido_html"></div>
    
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <div class="guardar_seleccion" id="guardar_seleccion" style="opacity: 0; z-index: 50; width: 100%; height: 100%; background-color: #000000d4; position: fixed; top: 0;">
            <div style="position: absolute; right: 132px; bottom: 154px; text-align: center">
                <h2 style="font-weight: bold; color: white">Para guardar la selección <br> haga click en el icono de "Guardar"</h2>
                <img class="imagen_flecha" src="/img/flecha.png" alt="">
            </div>
        </div>
        <button @click="guardarSeleccion" style="position: fixed; right: 20px; top: 84%; z-index: 100;" type="button" class="btn btn-float btn-float-lg btn-outline-primary btn-round">
            <i class="fa fa-save"></i>
        </button>

        <div class="modal fade text-left" id="modalCompartir" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #1976d2; color: white;">
                        <h4 class="modal-title" id="myModalLabel17">Selecciona los estudiantes con los que deseas compartir este contenido</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-4">
                                <fieldset class="form-group position-relative has-icon-left">
                                    <select v-model="gradoSelect" name="grado" class="form-control">
                                        <option value="">Seleccione un grado</option>
                                        <option value="1">1º</option>
                                        <option value="2">2º</option>
                                        <option value="3">3º</option>
                                        <option value="4">4º</option>
                                        <option value="5">5º</option>
                                        <option value="6">6º</option>
                                        <option value="7">7º</option>
                                        <option value="8">8º</option>
                                        <option value="9">9º</option>
                                        <option value="10">10º</option>
                                        <option value="11">11º</option>
                                    </select>
                                    <div class="form-control-position">
                                        <i class="fas fa-graduation-cap"></i>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-4">
                                <fieldset class="form-group position-relative has-icon-left">
                                    <select v-model="grupoSelect" name="grupo" class="form-control">
                                        <option value="">Seleccione un grupo</option>
                                        <option value="Grupo 1">Grupo 1</option>
                                        <option value="Grupo 2">Grupo 2</option>
                                        <option value="Grupo 3">Grupo 3</option>
                                        <option value="Grupo 4">Grupo 4</option>
                                        <option value="Grupo 5">Grupo 5</option>
                                        <option value="Grupo 6">Grupo 6</option>
                                        <option value="Grupo 7">Grupo 7</option>
                                        <option value="Grupo 8">Grupo 8</option>
                                        <option value="Grupo 9">Grupo 9</option>
                                        <option value="Grupo 10">Grupo 10</option>
                                    </select>
                                    <div class="form-control-position">
                                        <i class="fas fa-users"></i>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-3" style="padding: 0">
                                <fieldset class="form-group position-relative has-icon-left">
                                    <select v-model="jornadaSelect" name="jornada" class="form-control">
                                        <option value="">Jornada</option>
                                        <option value="Mañana">Mañana</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Continua">Continua</option>
                                    </select>
                                    <div class="form-control-position">
                                        <i class="fas fa-sun"></i>
                                    </div>
                                </fieldset>

                                <input type="hidden" name="tipo_registro" value="estudiante">
                            </div>
                            <div class="col-1" style="display: flex; height: 80%;">
                                <button type="button" @click="filtrarEstudiantes(1)" class="btn btn-success"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                        <hr>
                        <div class="table-responsive">
                            <table id="estudiantes_filtrados" class="table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="select-all" /></th>
                                        <th>Nombre</th>
                                        <th>Grupo</th>
                                        <th>Grado</th>
                                        <th>Jornada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in estudiantesFiltrados" :key="index">
                                        <td></td>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.grupo }}</td>
                                        <td>{{ item.grado }}</td>
                                        <td>{{ item.jornada }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="compartirContenido" class="btn btn-outline-primary"><i class="fas fa-share"></i> Compartir</button>
                        <button type="button" @click="vaciarArray('#modalCompartir')" class="btn grey btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade text-left" id="modalForo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #1976d2; color: white;">
                        <h4 class="modal-title" id="myModalLabel17">Crear Foro</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <h3 style="color: #ff425c;"><strong>1. </strong>Información general del foro</h3>
                                <hr>
                                <div class="row" style="margin: 0px">
                                    <label for="pregunta"><strong>Título de tu foro</strong></label>
                                    <input type="text" v-model="tituloForo" class="form-control" name="titulo_foro" id="titulo_foro">
                                </div>
                                <br>
                                <div class="row" style="margin: 0px">
                                    <label for="pregunta"><strong>Describe el tema de tu foto</strong></label>
                                    <QuillEditor  style="height: 300px; width: 100%" theme="snow" toolbar="full" />
                                </div>
                            </div>  
                            <div class="col-lg-6">
                                <h3 style="color: #ff425c;"><strong>2. </strong>Selecciona los estudiantes para los cuales estará dirigido este foro</h3>
                                <hr>
                                <br>
                                <div class="row">
                                    <div class="col-4">
                                        <fieldset class="form-group position-relative has-icon-left">
                                            <select v-model="gradoSelect" name="grado" class="form-control">
                                                <option value="">Seleccione un grado</option>
                                                <option value="1">1º</option>
                                                <option value="2">2º</option>
                                                <option value="3">3º</option>
                                                <option value="4">4º</option>
                                                <option value="5">5º</option>
                                                <option value="6">6º</option>
                                                <option value="7">7º</option>
                                                <option value="8">8º</option>
                                                <option value="9">9º</option>
                                                <option value="10">10º</option>
                                                <option value="11">11º</option>
                                            </select>
                                            <div class="form-control-position">
                                                <i class="fas fa-graduation-cap"></i>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-4">
                                        <fieldset class="form-group position-relative has-icon-left">
                                            <select v-model="grupoSelect" name="grupo" class="form-control">
                                                <option value="">Seleccione un grupo</option>
                                                <option value="Grupo 1">Grupo 1</option>
                                                <option value="Grupo 2">Grupo 2</option>
                                                <option value="Grupo 3">Grupo 3</option>
                                                <option value="Grupo 4">Grupo 4</option>
                                                <option value="Grupo 5">Grupo 5</option>
                                                <option value="Grupo 6">Grupo 6</option>
                                                <option value="Grupo 7">Grupo 7</option>
                                                <option value="Grupo 8">Grupo 8</option>
                                                <option value="Grupo 9">Grupo 9</option>
                                                <option value="Grupo 10">Grupo 10</option>
                                            </select>
                                            <div class="form-control-position">
                                                <i class="fas fa-users"></i>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-3" style="padding: 0">
                                        <fieldset class="form-group position-relative has-icon-left">
                                            <select v-model="jornadaSelect" name="jornada" class="form-control">
                                                <option value="">Jornada</option>
                                                <option value="Mañana">Mañana</option>
                                                <option value="Tarde">Tarde</option>
                                                <option value="Continua">Continua</option>
                                            </select>
                                            <div class="form-control-position">
                                                <i class="fas fa-sun"></i>
                                            </div>
                                        </fieldset>

                                        <input type="hidden" name="tipo_registro" value="estudiante">
                                    </div>
                                    <div class="col-1" style="display: flex; height: 80%;">
                                        <button type="button" @click="filtrarEstudiantes(2)" class="btn btn-success"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                                <hr>
                                <div class="table-responsive">
                                    <table id="estudiantes_filtrados_foro" class="table">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" id="select-all-2" /></th>
                                                <th>Nombre</th>
                                                <th>Grupo</th>
                                                <th>Grado</th>
                                                <th>Jornada</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in estudiantesFiltrados" :key="index">
                                                <td></td>
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.grupo }}</td>
                                                <td>{{ item.grado }}</td>
                                                <td>{{ item.jornada }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                            </div>    
                        </div>                      
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="crearForo" class="btn btn-outline-primary"><i class="fas fa-share"></i> Crear Foro</button>
                        <button type="button" @click="vaciarArray('#modalForo')" class="btn grey btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="chat_lateral_container">
            <div id="overlay_chat_lateral" style="opacity:0"></div>
            <div id="chat_lateral" style="right: -40%;">
                <div class="modal-content" style="height: 100%;">
                    <div class="modal-header d-flex justify-content-between align-items-center" style="background-color: #1976d2; color: white;">
                        <div style="position: relative;">
                            <h3>{{ titulo_contenido }}</h3>
                            <h4 class="modal-title" id="myModalLabel17">Haz cualquier consulta sobre el contenido</h4>
                        </div>
                        <button type="button" @click="cerrarModalResumen" class="btn btn-danger boton_circular"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body p-1">
                        <div class="chat_container p-1">
                            <template v-for="(item, index) in lista_mensajes" :key="index">
                                <div class="caja_chat_usuario" v-if="item.role == 'user'">
                                    <div class="mensaje"> 
                                        <p>{{ item.content }}</p>
                                    </div>
                                </div>
                                <div v-else class="caja_chat_respuesta">
                                    <div class="avatar_bot">
                                        <img src="/images/bot.png" alt="Usuario" class="img-fluid">
                                    </div>
                                    <div class="mensaje">
                                        <p v-html="item.content"></p>
                                    </div>
                                </div>
                            </template>
                            <div v-if="loading_resumen && !esperando_primer_mensaje" class="caja_chat_respuesta">
                                <div class="avatar_bot">
                                    <img src="/images/bot.png" alt="Usuario" class="img-fluid">
                                </div>
                                <div class="mensaje">
                                    <p v-html="resultado_resumen"></p>
                                </div>
                            </div>
                            <div v-if="esperando_primer_mensaje" class="caja_chat_respuesta">
                                <div class="avatar_bot">
                                    <img src="/images/bot.png" alt="Usuario" class="img-fluid">
                                </div>
                                <div class="mensaje">
                                    <p>Pensando respuesta...</p>
                                </div>
                            </div>
                        </div>
                        <div class="row caja_pregunta d-flex justify-content-center align-items-center p-2">
                            <div class="col-11">
                                <div
                                    id="miInput"
                                    contenteditable="true"
                                    class="input-editable"
                                    @input="onInputEditable"
                                    data-placeholder="Escribe aquí..."
                                ></div>
                            </div>
                            <div class="col-1">
                                <button type="button" @click="realizarResumenIA" class="btn btn-primary boton_circular"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                        <SkeletonResumen v-if="loading_contenido" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import * as busquedaService from "../services/busqueda";
import * as iaService from "../services/ia";
import Skeleton from './skeleton/skeleton.vue';
import SkeletonResumen from './skeleton/skeletonResumen.vue';
import * as usuarioService from "../services/usuario";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components: {
        Skeleton,
        SkeletonResumen,
        QuillEditor
    },
    data() {
        return {
            id: 0,
            tipo: '',
            datos: {},
            loading: false,
            favorito: '',
            sessionData: {
                tipo_registro: null
            },
            gradoSelect: "",
            grupoSelect: "",
            jornadaSelect: "",
            tituloForo: "",
            descripcionForo: "",
            estudiantesFiltrados: [],
            arrayEstudiantesCompartir: [],
            table: null,
            escondido: false,
            tipoMarcador: 1,
            subrayados: [],
            apunteContenido: null,
            contenido_html: "",
            titulo_contenido: "",
            contenido_para_resumen: "",
            instrucciones_usuario: "",
            loading_resumen: false,
            resultado_resumen: "",
            historialChat: [],
            lista_mensajes: [],
            esperando_primer_mensaje: false,
            loading_contenido: false,
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.tipo = this.$route.params.tipo;
        this.BuscarContenido();
        this.getSessionData();

        var content = document.getElementById('content');

        content.addEventListener('mouseup', () => {
            var selection = window.getSelection();
            if (selection.toString().length > 0) {
                var clase = '';
                switch (this.tipoMarcador) {
                    case 1:
                        clase = 'highlight1';
                        break;
                    case 2:
                        clase = 'highlight2';
                        break;
                    case 3:
                        clase = 'highlight3';
                        break;
                    case 4:
                        clase = 'highlight4';
                        break;
                    case 5:
                        clase = 'highlight5';
                        break;
                }

                var range = selection.getRangeAt(0);
                var clonedContents = range.cloneContents();
               
                if (this.containsLineBreak(clonedContents)) {
                    toastr.error("<i class='fas fa-exclamation-triangle'></i> Por favor subraye párrafo a párrafo.");
                    return;
                }

                var span = document.createElement('span');
                span.className = clase;

                span.appendChild(clonedContents);

                this.subrayados.push({
                    texto: span.textContent,
                    clase: clase
                });

                if(this.subrayados.length == 1){
                    this.mostrarGuardar();
                }

                range.deleteContents();
                range.insertNode(span);
            }
        });
    },
    methods: {
        containsLineBreak(node) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                if (child.nodeType === 1) { // Elemento
                    if (this.containsLineBreak(child)) {
                        return true;
                    }
                } else if (child.nodeType === 3) { // Texto
                    if (child.nodeValue.includes('\n')) {
                        return true;
                    }
                }
            }
            return false;
        },
        goBack() {
            this.$router.go(-1);
        },
        mostrarGuardar(){
            document.getElementById("guardar_seleccion").style.display = "block";
            setTimeout(()=>{
                document.getElementById("guardar_seleccion").style.opacity = 1;
            }, 100)

            setTimeout(()=>{
                document.getElementById("guardar_seleccion").style.opacity = 0;
                setTimeout(()=>{
                    document.getElementById("guardar_seleccion").style.display = "none";
                }, 1300)
            }, 3000)
        },
        BuscarContenido: async function () {
            this.loading = true;
            try {
                await busquedaService.busquedaContenido(this.id, this.tipo).then(respuesta => {
                    this.datos = respuesta.data.datos[0];
                    document.title =  this.datos.titulo;
                    this.titulo_contenido = this.datos.titulo;
                    this.contenido_html = this.datos.cont_documento;
                    this.loading = false;
                    this.verificarFavorito();
                    setTimeout(()=>{
                        this.cargarContextoTexto();
                    }, 1000);
                });
            } catch (error) {
                console.log(error);
            }
        },
        async verificarFavorito(){
            await usuarioService.verificar_favorito(this.id).then(respuesta => {
                this.favorito = respuesta.data;
            });
        },  
        async agregarFavorito(){
            if(this.favorito == false){
                const datos = {
                    id: this.datos.id,
                    titulo: this.datos.titulo,
                    ruta: 'contenido/'+this.id+'/'+this.tipo
                };

                await usuarioService.agregar_favorito(datos).then(respuesta => {
                    var respuesta_ok = respuesta.data;
                    if(respuesta_ok[1] == 1){
                        toastr.success(respuesta_ok[0]);  
                        this.verificarFavorito();
                    }else{
                        toastr.error(respuesta_ok[0]);
                    }
                });
            }else{
                await usuarioService.eliminar_favorito(this.datos.id).then(respuesta => {
                    var respuesta_ok = respuesta.data;
                    toastr.success(respuesta_ok);  
                    this.verificarFavorito(); 
                });
            }
        },
        async getSessionData() {
            await usuarioService.getSessionData().then(respuesta => {
                this.sessionData = respuesta.data;
            });
        },
        async filtrarEstudiantes(tipo) {
            if(this.gradoSelect != "" && this.grupoSelect != "" && this.jornadaSelect != ""){
                await usuarioService.filtrarEstudiantes(this.gradoSelect, this.grupoSelect, this.jornadaSelect).then(respuesta => {
                    this.estudiantesFiltrados = respuesta.data;
                    if(this.estudiantesFiltrados.length == 0){
                        toastr.warning("¡No hay estudiantes para los filtros seleccionados!");
                    }else{
                        if(tipo == 1){
                            $('#estudiantes_filtrados').DataTable().clear().draw();
                            $('#estudiantes_filtrados').DataTable().destroy();
                            setTimeout(() => {
                                this.dataTablesA("#estudiantes_filtrados", "#select-all");
                            }, 200);
                        }else{
                            $('#estudiantes_filtrados_foro').DataTable().clear().draw();
                            $('#estudiantes_filtrados_foro').DataTable().destroy();
                            setTimeout(() => {
                                this.dataTablesA("#estudiantes_filtrados_foro", "#select-all-2");
                            }, 200);
                        }
                    }
                });
            }else{
                toastr.warning("¡Todos los campos son obligatorios!");
            }  
        },
        vaciarArray(id){
            $(id).modal('hide');
            this.estudiantesFiltrados = [];
            this.gradoSelect = "";
            this.grupoSelect = "";
            this.jornadaSelect = "";
            this.tituloForo = "";
            this.descripcionForo = "";
        },
        dataTablesA(id_tabla, id_check) {
            this.table = $(id_tabla).DataTable({
                language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ Entradas",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    }
                },
                columnDefs: [
                    {
                        orderable: false,
                        className: 'select-checkbox', 
                        targets: 0,
                    }
                ],
                select: {
                    style: 'multi',
                    selector: 'td:first-child',
                },
                order: [[1, 'asc']]
            });

            var tabla = this.table;

            $(id_check).on('click', function () {
                if (this.checked) {
                    tabla.rows().select();
                } else {
                    tabla.rows().deselect();
                }
            });
        },
        async compartirContenido(){
            this.arrayEstudiantesCompartir = [];

            if(this.table != null){
                var selectedData = this.table.rows({ selected: true }).data().toArray();
                for (let index = 0; index < selectedData.length; index++) {
                    const element = selectedData[index];
                    var registro = this.estudiantesFiltrados.find((item) => item.nombre == element[1] && item.grupo == element[2] && item.grado == element[3] && item.jornada == element[4]);
                    if(registro != null) {
                        this.arrayEstudiantesCompartir.push(registro._id.$oid);
                    }
                }
            }

            var data = {
                ids: this.arrayEstudiantesCompartir,
                titulo: this.datos.titulo,
                ruta: 'contenido/'+this.id+'/'+this.tipo
            }

            var tabla = this.table;

            if(this.arrayEstudiantesCompartir.length > 0) {
                await usuarioService.compartirContenido(data).then(respuesta => {
                    this.vaciarArray('#modalCompartir');
                    toastr.success(respuesta.data);
                    setTimeout(()=>{
                        tabla.rows().deselect();
                    }, 300)
                });
            }else{
                toastr.warning("¡Debe seleccionar al menos un estudiante!");
            }
        },
        async crearForo(){
            this.arrayEstudiantesCompartir = [];

            if(this.table != null){
                var selectedData = this.table.rows({ selected: true }).data().toArray();
                for (let index = 0; index < selectedData.length; index++) {
                    const element = selectedData[index];
                    var registro = this.estudiantesFiltrados.find((item) => item.nombre == element[1] && item.grupo == element[2] && item.grado == element[3] && item.jornada == element[4]);
                    if(registro != null) {
                        this.arrayEstudiantesCompartir.push(registro._id.$oid);
                    }
                }
            }

            this.descripcionForo = document.querySelector(".ql-editor").innerHTML;

            var data = {
                ids: this.arrayEstudiantesCompartir,
                id_contenido: this.datos.id,
                tipo_contenido: this.tipo,
                titulo: this.tituloForo,
                descripcion: this.descripcionForo,
                ruta: 'contenido/'+this.id+'/'+this.tipo
            }

            var tabla = this.table;

            if(this.arrayEstudiantesCompartir.length > 0 && this.tituloForo != "" && this.descripcionForo != "") {
                await usuarioService.crearForo(data).then(respuesta => {
                    this.vaciarArray('#modalForo');
                    toastr.success(respuesta.data);
                    setTimeout(()=>{
                        tabla.rows().deselect();
                    }, 300)
                });
            }else{
                toastr.warning("¡Debe seleccionar al menos un estudiante!");
            }
        },
        escondermostrar(){
            var div = document.getElementById("colores");
            if(this.escondido){
                div.style.right = "-2px";
                this.escondido = false;
            }else{
                div.style.right = "-101px"
                this.escondido = true;
            }
        },
        seleccionarcolor(index_p){
            this.tipoMarcador = index_p;
            var div = document.getElementById("content");

            switch (this.tipoMarcador) {
                case 1:
                    div.style.cursor = "url('/images/amarillo.png'), auto";
                    break;
                case 2:
                    div.style.cursor = "url('/images/azul.png'), auto";
                    break;
                case 3:
                    div.style.cursor = "url('/images/rosado.png'), auto";
                    break;
                case 4:
                    div.style.cursor = "url('/images/verde.png'), auto";
                    break;
                case 5:
                    div.style.cursor =  "url('/images/borrador.png'), auto";
                    break;
            }

            var colores =  document.getElementsByClassName("color");
            for (let index = 0; index < colores.length; index++) {
                const element = colores[index];
                element.style.border = "none";
            }
            
            document.getElementById("color"+index_p).style.border = "3px solid #5e5d5d";
        },
        async guardarSeleccion(){
            var data = {
                id_contenido: this.datos.id,
                tipo_contenido: this.tipo,
                titulo: this.datos.titulo,
                data: document.getElementById("content").innerHTML,
                ruta: 'contenido/'+this.id+'/'+this.tipo
            }

            if(this.subrayados.length > 0) {
                await usuarioService.guardarSeleccion(data).then(respuesta => {
                    const respuesta_ok = respuesta.data;
                    if (respuesta_ok.estado === 1) {
                        toastr.success('<i class="fas fa-check"></i> '+respuesta_ok.mensaje);
                    } else {
                        toastr.error('<i class="fas fa-exclamation-triangle"></i> '+respuesta_ok.mensaje);
                    }
                });
            }else{
                toastr.warning("¡No hay apuntes que guardar!");
            }
        },
        mostrarChatLateral(){
            $("#chat_lateral_container").css("display", "block");
            setTimeout(() => {
                $("#overlay_chat_lateral").css("opacity", "1");
                $("#chat_lateral").css("right", "0");
            }, 10);
        },
        onInputEditable(event){
            this.instrucciones_usuario = event.target.innerText;
        },
        async cargarContextoTexto(){
            this.loading_contenido = true;
            // 1. Configuramos el historial inicial
            this.contenido_para_resumen = $("#content").text().replace(/\s+/g, " ");
            var promptInicial = this.contenido_para_resumen;
                
            this.historialChat = [
                { 
                    role: "system", 
                    content: `Eres un asistente experto y chatbot (SOLO TOMARAS EN CUENTA EL ULTIMO MENSAJE DEL USUARIO PARA RESPONDER).
                        REGLA IMPORTANTE: SOLO TOMARAS EN CUENTA EL ULTIMO MENSAJE DEL USUARIO PARA RESPONDER.

                        ETAPA 0 (SALUDO):
                        - Si el usuario te saluda, saludalo y preguntale en que lo puedes ayudar.
                        - Si el usuario te agradece, responde con <p>De nada, ¡es un placer ayudarte! ¿En qué más puedo apoyarte?</p>

                        ETAPA 1 (CARGA DE TEXTO):
                        - Vas a recibir un TEXTO BASE.
                        - Debes analizarlo internamente para usarlo después.
                        - No hagas nada en esta etapa solo responde <p>Ok</p> cuando termines de analizar el texto.

                        REGLAS IMPORTANTES:
                        - No inventes información que no esté en el texto.
                        - Mantén nombres, fechas, cifras y lugares EXACTOS.
                        - No des opiniones personales.
                        - Si el usuario pregunta algo que no tiene que ver con el texto: responde "No se puede realizar la tarea, ya que no pertenecen al texto analizado"
                        - SIEMPRE responde en HTML válido.
                        - Usa <p> para párrafos.
                        - Usa <ul><li> para listas.
                        - No uses Markdown.
                        - No uses \`\`\`.
                        - No uses texto fuera de etiquetas HTML.
                    `
                },
                { 
                    role: "user", 
                    content: `TEXTO BASE: ${promptInicial}`
                }
            ];

            var respuesta = await iaService.cargarContextoTexto(this.historialChat);
            if(respuesta.success){
                this.historialChat.push({ role: "assistant", content: respuesta.data.message.content });
                this.loading_contenido = false;
            }else{
                this.loading_contenido = false;
                toastr.error('<i class="fas fa-exclamation-triangle"></i> '+respuesta.message);
            }
        },
        async realizarResumenIA(){
            this.loading_resumen = true;
            this.esperando_primer_mensaje = true;
            this.resultado_resumen = ""; 
            this.lista_mensajes.push({ role: "user", content: this.instrucciones_usuario });

            try {
                var prompt = `INSTRUCCIÓN DEL USUARIO: ${this.instrucciones_usuario}`;

                this.historialChat.push({ role: "user", content: prompt });
                //limpiar div miInput
                document.getElementById("miInput").innerHTML = "";
                document.getElementById("miInput").focus();
                this.instrucciones_usuario = '';

                await iaService.realizarResumenStreaming(
                    this.historialChat,
                    (chunk, terminado) => {
                        if(this.esperando_primer_mensaje){
                            this.esperando_primer_mensaje = false;
                        }
                        if(terminado){
                            this.loading_resumen = false;
                        }else{
                            this.resultado_resumen += chunk; 
                        }
                    },
                    this.lista_mensajes
                );

                //eliminar el ultimo mensaje del historial
                this.historialChat.pop();
            } catch (error) {
                console.log(error);
            }
        },
        cerrarModalResumen(){
            $("#overlay_chat_lateral").css("opacity", "0");
            $("#chat_lateral").css("right", "-40%");
            setTimeout(() => {
                $("#chat_lateral_container").css("display", "none");
            }, 500);
            this.resultado_resumen = '';
            this.instrucciones_usuario = '';
            this.contenido_para_resumen = '';
            this.loading_resumen = false;
        }
    }
}
</script>
<style>

    .list-inline li {
        margin-left: 5px;
        margin-right: 5px;
    }
    
    #content{
        cursor: url('/images/amarillo.png'), auto;
    }
    
    .colores{
        width: 100px;
        height: 370px;
        position: fixed;
        border-radius: 15px 0px 0px 15px;
        right: -2px;
        top: 23%;
        background-color: #fff;
        box-shadow: 0 10px 40px 0 rgb(109 109 109 / 28%), 0 2px 9px 0 rgb(107 107 107 / 32%);
        transition: right .5s linear;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #coloresesconder {
        cursor: pointer;
        content: "";
        position: absolute;
        left: -20px;
        top: 37%;
        width: 20px;
        height: 56px;
        background-color: #fff;
        border-radius: 5px 0px 0px 5px;
        box-shadow: -6px 0px 10px rgb(109 109 109 / 28%);       
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    .color {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 12px;
        cursor: pointer;
    }

    #color1{
        background-color: #ffdd21;
        border: 3px solid #5e5d5d;
    }

    #color2{
        background-color: #59ddfb;
        border: none;
    }

    #color3{
        background-color: #fe5196;
        border: none;
    }

    #color4{
        background-color: #bcf220;
        border: none;
    }

    #color5{
        background-image: url('/img/borrador_logo.png');
        border: none;
        background-repeat: no-repeat;
        background-size: 80% 80%;
        background-position: center;
    }

    .highlight1 {
        background-color: #ffdd21;
    }

    .highlight2 {
        background-color: #59ddfb;
    }

    .highlight3 {
        background-color: #fe5196;
        color: #fff;
    }

    .highlight4 {
        background-color: #bcf220;
    }

    .highlight5 {
        background-color: #ffff;
        color: #404e67;
    }

    #guardar_seleccion{
        display: none;
        transition: opacity 1.3s linear;
    }

    .imagen_flecha {
        position: absolute;
        height: 73px;
        right: -40px;
        top: 83px;
        animation: animacion-img 1.5s infinite alternate;
    }

    @keyframes animacion-img {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    #chat_lateral_container {
        width: 100%;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 9999999999;
        display: none;
    }

    #chat_lateral {
        width: 40%;
        height: 100vh;
        background-color: #f0f0f0;
        border-right: 1px solid #ccc;
        position: fixed;
        right: -40%;
        top: 0;
        z-index: 10000000000;
        transition: right .5s ease-in;
    }

    #overlay_chat_lateral {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        right: 0;
        top: 0;
        z-index: 9999999999;
        opacity: 0;
        transition: opacity .5s ease-in;
    }

    .caja_pregunta{
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        z-index: 9999999999;
    }

    .input-editable {
        border: 1px solid #ccc;
        padding: 8px 10px;
        border-radius: 8px;

        min-height: 40px;
        max-height: 100px;

        overflow-y: auto; /* cuando pase de 100px aparece scroll */
        outline: none;

        white-space: pre-wrap;
        word-break: break-word;
    }

    .input-editable:empty:before {
        content: attr(data-placeholder);
        color: #999;
    }

    .boton_circular{
        width: 40px;
        height: 40px;
        border-radius: 50% !important;
        border: none;
    }

    .caja_chat_usuario{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;
    }

    .caja_chat_respuesta{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
    }

    .caja_chat_respuesta .mensaje, .caja_chat_usuario .mensaje{
        background-color: #ffffff;
        padding: 10px;
        border-radius: 10px;
        width: fit-content; 
        max-width: 80%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .caja_chat_respuesta .avatar_bot {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-left: 10px;
        padding: 10px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }

    .chat_container{
        height: 73vh;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f7f7f7;
        border-radius: 10px;
    }

</style>