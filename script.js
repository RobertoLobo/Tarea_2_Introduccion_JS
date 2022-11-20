const escena = new THREE.Scene()
const camara = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 )
const render = new THREE.WebGLRenderer({ antialias: true})
// Canvas
render.setSize( window.innerWidth, window.innerHeight )
render.setClearColor("#444444")
document.body.appendChild( render.domElement )

// Ajusta canvas cuando se reajusta ventana
window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	render.setSize( width, height )
	camara.aspect = width / height
	camara.updateProjectionMatrix()
})

// Dibujar Cubo
var geometria = new THREE.BoxGeometry( 1, 1, 1)
//var material = new THREE.MeshBasicMaterial( { color: 0x83004d }) // Color del Cubo
var material = new THREE.MeshStandardMaterial( { color: 0xda77f4, flatShading: true, metalness: 0, roughness: 1 })
var cubo = new THREE.Mesh ( geometria, material )
escena.add( cubo )
render.render( escena, camara )
camara.position.z = 2 // Zoom

// Dibujar Cubo de Alambre
var geometria = new THREE.BoxGeometry( 2, 2, 2)
var material = new THREE.MeshBasicMaterial( {
    color: "#fcff68", wireframe: true, transparent: true} )
var cuboAlambre = new THREE.Mesh ( geometria, material )
escena.add( cuboAlambre )

// Iluminar Cubo
var luzAmbiente = new THREE.AmbientLight ( 0xffffff, 0.5)
escena.add( luzAmbiente )
// Punto de iluminacion
var puntoLuz = new THREE.PointLight( 0xffffff, 1 );
puntoLuz.position.set( 25, 50, 25 );
escena.add( puntoLuz );


// Animar Cubo
function animar() {
    requestAnimationFrame( animar )
    cubo.rotation.x += Math.PI / 100;
    cubo.rotation.y += Math.PI / 100;
    cuboAlambre.rotation.x -= 0.01;
    cuboAlambre.rotation.y -= 0.01;
    render.render( escena, camara )
}
animar()

