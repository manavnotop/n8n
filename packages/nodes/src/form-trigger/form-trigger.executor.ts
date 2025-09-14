import { ExecutionContext, NodeExecutionData, NodeExecutor } from '@repo/types/types'

export class FormTriggerExecutor implements NodeExecutor{
  async execute(context: ExecutionContext): Promise<NodeExecutionData[]> {
    const { node } = context;
    const parameters = node.parameters || {}

    console.log(`form trigger node ${node.name} executed`)

    const formData = {
      message: parameters.message || "form submitted successfully",
      timestamp: new Date().toString(),
      formData: parameters.formData || { 
        name: 'manav', email: 'manuagarwal1443@gmail.com'
      }
    }
    console.log('form data from form trigger', formData);
    return [{
        json: formData
      }
    ]
  }
}