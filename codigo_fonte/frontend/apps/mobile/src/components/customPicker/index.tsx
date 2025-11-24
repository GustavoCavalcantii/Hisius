import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleProp,
  TextStyle,
} from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { color } from "packages/ui/theme/colors";

interface CustomPickerProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Selecione",
  error = "",
  icon,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.textValue, style]}>{selectedLabel}</Text>
        <View style={styles.dropdownIcon}>
          <Icon name="chevron-down" size={20} color={color.text} />
        </View>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomPicker;
