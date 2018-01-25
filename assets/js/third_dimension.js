var scene = new THREE.Scene();

            var frontdiv = document.getElementById("front");
            var divrect = frontdiv.getBoundingClientRect()
			var camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000 );
			var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; // default THREE.PCFShadowMap
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;

//Create a PointLight and turn on shadows for the light
var light1 = new THREE.SpotLight( 0xffffff, 2, 0 );
light1.position.set( -100, 15, -100 );
light1.castShadow = true;            // default false
light1.shadowDarkness =1;
scene.add( light1 );

var light2 = new THREE.SpotLight( 0xffffff, 1, 500 );
light2.position.set( -100, 15, -260 );
light2.castShadow = true;            // default false
light2.shadowDarkness =1;
scene.add( light2 );

var light3 = new THREE.SpotLight( 0xffffff, 1, 500 );
light3.position.set( -100, 15, -420 );
light3.castShadow = true;            // default false
light3.shadowDarkness =1;
scene.add( light3 );


			renderer.setSize( divrect.width, divrect.height );
			frontdiv.appendChild( renderer.domElement );
            var grid = new THREE.GridHelper( 500, 50 );
            //scene.add( grid );
            scene.fog = new THREE.FogExp2( 0x000000, 0.0098 );
renderer.setClearColor( scene.fog.color, 1 );
var base_width = Math.ceil(divrect.width/5)
var width = base_width*2
var nH = 160;
var geometry1 = new THREE.PlaneGeometry(base_width*2, 160, width, nH);
var geometry2 = new THREE.PlaneGeometry(base_width*2, 160, width, nH);
var geometry3 = new THREE.PlaneGeometry(base_width*2, 160, width, nH);



var material1 = new THREE.MeshPhongMaterial( {color: 0xcccccc, side: THREE.DoubleSide, wireframe: false, vertexColors: THREE.VertexColors} );
var material2 = new THREE.MeshPhongMaterial( {color: 0xcccccc, side: THREE.DoubleSide, wireframe: false, vertexColors: THREE.VertexColors} );
var material3 = new THREE.MeshPhongMaterial( {color: 0xcccccc, side: THREE.DoubleSide, wireframe: false, vertexColors: THREE.VertexColors} );
var plane1 = new THREE.Mesh( geometry1, material1 );
var plane2 = new THREE.Mesh( geometry2, material2 );
var plane3 = new THREE.Mesh( geometry3, material3 );
plane1.rotation.x = 3*Math.PI/2;
plane1.rotation.z = Math.PI;
plane2.rotation.x = 3*Math.PI/2;
plane2.rotation.z = Math.PI;
plane3.rotation.x = 3*Math.PI/2;
plane3.rotation.z = Math.PI;
plane2.position.z = -160;
plane3.position.z = -320;

plane1.receiveShadow = true;
plane2.receiveShadow = true;
plane3.receiveShadow = true;
plane1.castShadow = true;
plane2.castShadow = true;
plane3.castShadow = true;
var delta = 0;
var peakhold = [];
var maxHeight = 25;
scene.add( plane1 );
scene.add( plane2 );
scene.add( plane3 );


//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper( light1.shadow.camera );
//scene.add( helper );
camera.position.z =110;
camera.position.y = 40;

plane1.geometry.verticesNeedUpdate=true;
plane2.geometry.verticesNeedUpdate=true;
plane3.geometry.verticesNeedUpdate=true;

var woo = 9;
createHills(plane1);
createHills(plane2);
createHills(plane3);

			var animate = function () {
				requestAnimationFrame( animate );
                camera.position.z -=0.2;
                if(camera.position.y > 5){
                    camera.position.y -=0.01;
                }




				renderer.render(scene, camera);
                if(camera.position.z - plane1.position.z <-100){
                    plane1.position.z -= 480;
                    light1.position.z -=480;
                    //peak3 = choosePeaks(plane3);
                    createHills(plane3);


                }
                if(camera.position.z - plane2.position.z <-100){
                    plane2.position.z -= 480;
                    light2.position.z -=480;
                    //peak1 = choosePeaks(plane1);
                    createHills(plane1);
                }
                if(camera.position.z - plane3.position.z <-100){
                    plane3.position.z -= 480;
                    light3.position.z -=480;
                    //peak2 = choosePeaks(plane2);
                    createHills(plane2);
                }

                if(camera.position.z - plane1.position.z < 60){


                }
                if(camera.position.z - plane2.position.z < 60){


                }
                if(camera.position.z - plane3.position.z < 60){


                }




			};

			animate();






function choosePeaks(plane){
    var peaks = []
    for (var i = 0, l = plane.geometry.vertices.length; i < l; i++) {
    if(i%(width+1) <= (width+1)/2 - woo | i%(width+1) > (width+1)/2 + woo){
        if(Math.random() > 0.999){
            var localHeight = Math.random()*maxHeight;
            //peaks.push([i,localHeight]);
            peaks.push(i);

            }
        plane.geometry.vertices[i].z = 0
    }

}
    return peaks;
}

function updateHills(plane, peaks){
    for(var i = 0 ; i < peaks.length; i++){
        var peak = peaks[i];
        var d = peak[0];
        var h = peak[1];
        plane.geometry.vertices[d].z += (1 - (plane.geometry.vertices[d].z/h))/100
        if(plane.geometry.vertices[d].z > h-1){
            peaks.splice(d,1);
        }

    }

}

function createHills(plane){
    var hills = [];
    var f = 2;
    var A = 4;
    var woop = woo;
    var elevation = 0;
    var peaks = choosePeaks(plane);
    for(var j =0 ; j< peaks.length; j++){
        checkSurroundings(plane,peaks[j], 129);
    }
    for(var i = 0; i < plane.geometry.vertices.length; i++){
        woop = woo - Math.floor(Math.random()*woo-1)

        if(i%(width+1)==Math.floor(width/2) & Math.floor(i/(width+1))== 5){


        }
        //if((j + 161*i)%(width+1) <= (width+1)/2 - woop | (j + 161*i)%(width+1) > (width+1)/2 + woop){


        //}
        plane.geometry.verticesNeedUpdate=true;

        }
    }

function noise1(noise,nx,ny){
    return noise.noise(nx,ny)/2 + 0.5
}


function checkSurroundings(plane, peak, size){
    var value = 0;
    var point = 0;
    var total = 0;
    var corners = getCorners(size,peak);
    var cornerValues = [];
    try{

        corners.map(function(d){


            if(plane.geometry.vertices[d].z == 0){
                point = Math.random();
                cornerValues.push(point);
                plane.geometry.vertices[d].z = point  + Math.random()*2 - 1;
            }else{
                cornerValues.push(plane.geometry.vertices[d].z);
            }

        });
        var midpoints = getMidpoints(size, corners, cornerValues);

        midpoints.map(function(d){
            plane.geometry.vertices[d[0]].z = d[1] + Math.random()*2 - 1;
            total += d[1]
        });
        var center = peak + (size-1)/2 + ((size-1)/2)*(width+1)
        plane.geometry.vertices[center].z = (total/4)  + Math.random()*2 - 1;
        if(size-1 ==2){
            return undefined;

        }else{
            checkSurroundings(plane,midpoints[0][0],((size-1)/2) + 1)
            checkSurroundings(plane,midpoints[1][0],((size-1)/2) + 1)
            checkSurroundings(plane,peak,((size-1)/2) + 1)
            checkSurroundings(plane,center,((size-1)/2) + 1)
        }



    }catch(err){

    }



}


function getCorners(size,peak){
    var corners = [];
    corners.push(peak);
    corners.push(peak+size);
    corners.push(peak + (width+1)*size + size);
    corners.push(peak + (width+1)*size);
    return corners;
}
function getMidpoints(size, corners, values){
    var midpoints = [];
    midpoints.push([corners[0] + (size-1)/2,
                    (values[0]+values[1])/2]);
    midpoints.push([corners[0] + ((size-1)/2) * (width+1),
                   (values[0]+values[3])/2]);
    midpoints.push([corners[2] - (size-1)/2,
                   (values[2]+values[3])/2]);
    midpoints.push([corners[2] - ((size-1)/2) * (width+1),
                   (values[2]+values[1])/2]);
    return midpoints;
}



























