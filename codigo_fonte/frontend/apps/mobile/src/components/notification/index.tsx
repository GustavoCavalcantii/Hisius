import React, { useEffect, useState, useRef } from "react";
import { Animated, Text, ViewStyle } from "react-native";
import type { NotificationComponentProps } from "./types";
import {
  NotificationWrapper,
  NotificationContent,
  NotificationMessage,
  CloseButton,
  CloseButtonContent,
} from "./styles";

export const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notification,
  onClose,
  style,
}) => {
  const { message, type, duration } = notification;
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration - 300);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const animatedStyle = {
    transform: [{ translateX: slideInterpolate }],
    opacity: fadeAnim,
  };

  const nativeStyle = style as ViewStyle;

  return (
    <Animated.View style={[animatedStyle, nativeStyle]}>
      <NotificationWrapper $type={type} $isExiting={isExiting}>
        <NotificationContent>
          <NotificationMessage>{message}</NotificationMessage>
          <CloseButton onPress={handleClose}>
            <CloseButtonContent>
              <Text style={{ fontSize: 18, color: "#000" }}>×</Text>
            </CloseButtonContent>
          </CloseButton>
        </NotificationContent>
      </NotificationWrapper>
    </Animated.View>
  );
};
