import { WorkflowEngine } from './engine';

class MockFormTrigger {
  async execute() {
    console.log('Form Trigger executed');
    return [{ json: { message: "Form submitted!", timestamp: new Date().toISOString() } }];
  }
}

class MockTelegram {
  async execute(context: any) {
    console.log('Telegram executed with data:', context.inputData);
     return [{ json: { status: "Message sent", messageId: "12345" } }];
  }
}

class MockEmail {
  async execute(context: any) {
    console.log('Email executed with data:', context.inputData);
    return [{ json: { status: "Email sent", recipient: "user@example.com" } }];
  }
}

const testWorkflow = {
  id: "test-workflow-1",
  name: "Test Linear Workflow",
  nodes: [
    {
      id: "node-1",
      name: "Form Trigger",
      type: "form-trigger",
      parameters: {},
    },
    {
      id: "node-2",
      name: "Telegram",
      type: "telegram",
      parameters: {
        chatId: "123456789",
      },
    },
    {
      id: "node-3",
      name: "Email",
      type: "email",
      parameters: {
        to: "user@example.com",
      },
    },
  ],
  connections: {
    "Form Trigger": {
      main: [
        [
          {
            node: "Telegram",
            index: 0,
          },
        ],
      ],
    },
    Telegram: {
      main: [
        [
          {
            node: "Email",
            index: 0,
          },
        ],
      ],
    },
  },
};

async function testEngine() {
  console.log("Testing Workflow Engine...");

  const engine = new WorkflowEngine();

  // Register mock nodes
  engine.registerNodeType("form-trigger", new MockFormTrigger());
  engine.registerNodeType("telegram", new MockTelegram());
  engine.registerNodeType("email", new MockEmail());

  try {
    await engine.executeWorkflow(testWorkflow);
    console.log("Engine test completed successfully!");
  } catch (error) {
    console.error("Engine test failed:", error);
  }
}

testEngine();