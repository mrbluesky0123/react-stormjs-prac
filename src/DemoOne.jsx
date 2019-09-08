import React from 'react';
import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DiagramModel,
	DefaultNodeModel,
	DefaultPortModel,
	LinkModel
} from 'storm-react-diagrams';
import axios from 'axios';
import './srd.css';
// import 'semantic-ui-css/semantic.min.css'
// import { Button, H`eader, Image, Modal } from 'semantic-ui-react'

class DemoOne extends React.Component {
	
	state = {
        data: null, // 배치 전체 리스트 호출 응답값
	};
	

	constructor(props) {
        super(props);
        this.fetchBatchList();
	}

	getBatchList = () => {
		return axios.get('http://198.13.47.188:8080/graph/BTPBATCH001');
	}
	
	fetchBatchList = async () => {
		console.log("q123123123123123");
		const response = await this.getBatchList();
		this.setState({
			...this.state,
			data: response.data,
		});
		console.log("qqqqqq : " + (this.state.data)['batchNodes'][0]['batchId']);
	}
		
	getNode = (nodes, targetName) => {

		for(var i = 0; i < nodes.length; i++){

			if(nodes[i].name == targetName){
				return nodes[i];
			}
			else{
				continue;
			}	
		}
		return null;

	}

	render() {

		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());

		const model = new DiagramModel();
		
		this.engine.setDiagramModel(model);
		// console.log("aaaasssssaaa : " + this.state.response.data);
		console.log('aaasadasdasadw222222aa')
		var aaa = 'Unloaded';
		if(this.state.data != null){

			aaa = JSON.stringify(this.state.data.batchNodes);
			let batchNodes = this.state.data.batchNodes;
			for(var k = 0; k < batchNodes.length; k++) {

				console.log('aaasadasdasadw222222aa: ' + batchNodes[k].batchId);

			}
			var positionX = 10;
			var positionY = 10;
			const nodes = []
			for(var i = 0; i < batchNodes.length; i++){
				const node1 = new DefaultNodeModel(batchNodes[i].batchId, 'rgb(70, 70, 70)');
				
				node1.addListener({

					selectionChanged: function(e){
						console.log('selection changed');
					},
					

				});
				{<node1 onClick={console.log('kang')}/>}
				var befores = batchNodes[i].before;
				for(var j = 0; j < befores.length; j++){
					const port1 = node1.addPort(new DefaultPortModel(true, befores[j], '◀︎'));
				}
				var nexts = batchNodes[i].next;
				for(var j = 0; j < nexts.length; j++){
					const port2 = node1.addPort(new DefaultPortModel(false, nexts[j], '▶︎'));
				}
				
				node1.x = batchNodes[i].posX;
				node1.y = batchNodes[i].posY;
				// positionX += 100;
				// positionY += 50; 
				nodes.push(node1);
				model.addNode(node1);

			}
			
			
			for(var i = 0; i < nodes.length; i++){
				// const port1 = node1.addPort(new DefaultPortModel(false, 'out-1', 'next'));	
				console.log("wwwww")
				var nexts = batchNodes[i].next;
				for(var j = 0; j < nexts.length; j++){
					const link = new LinkModel();
					var nextNode = this.getNode(nodes, nexts[j]);
					var nextPort = nodes[i].getPort(nexts[j]);
					var beforePort = nextNode.getPort(nodes[i].name);
					console.log('QQ: ' + beforePort);
					link.setSourcePort(nextPort);
					link.setTargetPort(beforePort);
					model.addLink(link);
				}	
				
			}
		}
		return (
			
			<div>
				<DiagramWidget onClick={() => (console.log("hello!!"))} diagramEngine={this.engine} />
			</div>
		);
	}
}

export default DemoOne;
