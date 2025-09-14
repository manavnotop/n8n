//workflow coming from the frontend
export interface Workflow {
  id: string,
  name: string,
  nodes: Node[],
  connections: Connections[]
}

//each node type; parameters is node required data, for eg: telegram node: { chat_id, message }
export interface Node {
  id: string, 
  name: string,
  type: string,
  parameters: Record<string, any>
}

//how the connection object looks like; eg: sourcename: form_trigger, main is array of arrays(for multiple output and connecion)
export interface Connections {
  [sourcename: string] : {
    main: Array<{ node: string; index: number}>[]
  }
}

//data each nodes gives and next node might use for execution
export interface NodeExecutionData {
  json: Record<string, any>;
}

export interface ExecutionContext {
  inputData: NodeExecutionData[];
  node: Node;
  workflow: Workflow;
}