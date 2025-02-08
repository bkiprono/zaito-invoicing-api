import { UserInterface } from 'src/users/interfaces/user.interface';
import {
  NotificationChannelsEnum,
  NotificationTypeEnum,
} from '../enums/notification.enum';
import { NotificationSubScriptionsInterface } from '../interfaces/notification-subscription.interface';
/**
 * Get the status on whether to send a notification to a user
 *
 * @export
 * @param {{
 *   user: UserInterface;
 *   notificationType: NotificationTypeEnum;
 *   channel: NotificationChannelsEnum;
 * }} payload
 * @return {*}  {boolean}
 */
export function getNotificationSubscriptionStatus(payload: {
  user: UserInterface;
  notificationType: NotificationTypeEnum;
  channel: NotificationChannelsEnum;
}): boolean {
  const subscriptions = payload.user.notifications;
  const notification: NotificationTypeEnum = payload.notificationType;

  if (!subscriptions) {
    return false;
  }
  // get the index
  const index = subscriptions.findIndex(
    (item: NotificationSubScriptionsInterface) =>
      (item.notification as NotificationTypeEnum) === notification,
  );

  if (index === -1) {
    return false;
  }

  const subscription: NotificationSubScriptionsInterface = subscriptions[index];
  if (payload.channel === NotificationChannelsEnum.EMAIL) {
    return subscription.channels.email;
  } else if (payload.channel === NotificationChannelsEnum.WHATSAPP) {
    return subscription.channels.whatsapp;
  } else if (payload.channel === NotificationChannelsEnum.SMS) {
    return subscription.channels.sms;
  } else {
    return false;
  }
}
