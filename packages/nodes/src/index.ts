import { FormTriggerExecutor } from "./form-trigger/form-trigger.executor";
import { TelegramExecutor } from "./telegram/telegram.executor";

export { FormTriggerExecutor, TelegramExecutor};

export const formTrigger = new FormTriggerExecutor();
export const telegramExecutor = new TelegramExecutor();