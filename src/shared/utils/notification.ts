import { Notifier, Easing } from 'react-native-notifier';
import colors from "../enums/colors";

export function displayInnerNotification(options = {}) {
  Notifier.showNotification({
    duration: 0,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    hideOnPress: false,
    componentProps: {
      descriptionStyle: {
        fontFamily: "Wimba",
        color: colors.darkBlue
      },
      titleStyle: {
        fontFamily: "Wimba",
        color: colors.darkBlue,
        fontWeight: "500",
        fontSize: 17,
      },
      containerStyle: {
        backgroundColor: colors.orange
      },
    },
    ...options
  });
}

export const displayErrorNotification = (error: any, defaultMessage: string = 'Api error'): void => {
  let errorMessage = error?.response?.data?.message || defaultMessage;
  displayInnerNotification({
    description: errorMessage,
    duration: 8000,
  });
};
