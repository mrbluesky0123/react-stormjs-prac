import * as SRD from "../../src/main";
/**
 * @author Dylan Vorster
 */
export declare class Application {
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;
    constructor();
    newModel(): void;
    getActiveDiagram(): SRD.DiagramModel;
    getDiagramEngine(): SRD.DiagramEngine;
}
