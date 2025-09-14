import { Workflow } from '@repo/types/types';
import { WorkflowEngine } from './engine'

export { WorkflowEngine }

const defaultEngine = new WorkflowEngine();
export default defaultEngine;

export async function executeWorkflow(workflow: Workflow){
  const engine = new WorkflowEngine();
  return engine.executeWorkflow(workflow)
}