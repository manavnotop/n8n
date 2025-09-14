import { FormTriggerExecutor } from "./form-trigger/form-trigger.executor";
import { TelegramExecutor } from "./telegram/telegram.executor";
import { ResendExecutor } from "./resend/resend.executor";

export { FormTriggerExecutor, TelegramExecutor, ResendExecutor};

export const formTrigger = new FormTriggerExecutor();
export const telegramExecutor = new TelegramExecutor();
export const resendExecutor = new ResendExecutor();