import { Connection, ExecutionContext, Node, NodeExecutionData, NodeExecutor, Workflow } from "@repo/types/types"

export class WorkflowEngine {
  private nodeRegistry: Map<string, NodeExecutor> = new Map();

  registerNodeType(type: string, executor: NodeExecutor): void {
    this.nodeRegistry.set(type, executor);
  }

  async executeWorkflow(workflow: Workflow): Promise<string[]> {
    console.log('started to execute the workflow');

    //find the first node
    const startNode = this.findFirstNode(workflow);

    let currentNode: Node | null = startNode
    let inputData: NodeExecutionData[] = [];
    const executionPath: string[] = []

    while(currentNode){
      executionPath.push(currentNode.name)
      //try executing the node
      try{
        const executor = this.getNodeExecutor(currentNode.type)
        
        const context: ExecutionContext = {
          inputData,
          node: currentNode,
          workflow
        };

        const outputData = await executor.execute(context);

        inputData = outputData

        const nextNodeName = this.getNextNode(currentNode.name, workflow)
        if(nextNodeName){
          currentNode = workflow.nodes.find(n => n.name === nextNodeName) || null;
        }
        else {
          currentNode = null;
        }
      }
      catch(error){
        console.error(`error executing node ${currentNode?.name}:`, error)
        throw new Error(`workflow execution failed at node '${currentNode?.name}'`)
      }
    }
    return executionPath;
  }

  private getNodeExecutor(type: string): NodeExecutor {
    const executor = this.nodeRegistry.get(type);
    if(!executor){
      throw new Error(`node ${type} is not registered`);
    }
    return executor;
  }

  private findFirstNode(workflow: Workflow): Node {

    const allTargetNodes = new Set<string>();
    
    for(const connections of Object.values(workflow.connections)){
      if (connections.main) {
        for (const outputConnections of connections.main) {
          for (const connection of outputConnections) {
            allTargetNodes.add(connection.node);
          }
        }
      }
    }

    for(const node of workflow.nodes){
      if(!allTargetNodes.has(node.name)){
        return node;
      }
    }

    if (workflow.nodes.length === 0) {
      throw new Error("Workflow has no nodes.");
    }
    return workflow.nodes[0]!;
  }

  private getNextNode(currentNodeName: string, workflow: Workflow): string | null {
    const connections = workflow.connections[currentNodeName];
    const firstOutput = connections?.main?.[0]?.[0];

    return firstOutput?.node ?? null
  }
}