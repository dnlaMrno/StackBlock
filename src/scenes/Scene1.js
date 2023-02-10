import { Scene, Color, DirectionalLight, HemisphereLight, Group, AxesHelper } from 'three';
import Box from '../objects/Box';
import BoxCreator from '../objects/BoxCreator';
import { Cube } from '../objects/Cube';

class Scene1 extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();
		this.create();
	}

	create() {
		this.base_cube = new BoxCreator({
			width:200,
			height:200,
			alt:200,
			color:0x2c3e50
		});
		this.add(this.base_cube);

		//Grupo de cajas
		this.boxes_group = new Group();
		this.add(this.boxes_group);

		this.newBox({
			width:200,
			height:200,
			last: this.base_cube
		});

		//Evento
		window.addEventListener('click', () => {
			this.click()
		});

		//helper
		this.add(new AxesHelper(800))

		//Luces
		const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);
	}

	click(){
		this.newBox({
			width:200,
			height:200,
			last: this.getLastBox()
		});
	}

	newBox({width, height, last}) {
		const actual_box = new Box({
			width,
			height,
			last
		});
		this.boxes_group.add(actual_box);
	}

	getLastBox(){
		return this.boxes_group.children[this.boxes_group.children.length -1]
	}

	update() {
		this.getLastBox().update();
	}
}

export default Scene1;
