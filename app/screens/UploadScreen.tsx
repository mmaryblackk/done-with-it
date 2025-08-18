import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

interface IUploadScreenProps {
  visible: boolean;
  onDone: () => void;
}

function UploadScreen({ visible = false, onDone }: IUploadScreenProps) {
  const animRef = useRef<LottieView>(null);
  const [currentAnimation, setCurrentAnimation] = useState(
    require("../assets/animations/loader.json")
  );

  useEffect(() => {
    if (visible) {
      animRef.current?.reset();
      animRef.current?.play();
    }
  }, [visible, currentAnimation]);

  const handleAnimationFinish = () => {
    if (currentAnimation === require("../assets/animations/loader.json")) {
      setCurrentAnimation(require("../assets/animations/done.json"));
    } else {
      onDone();
    }
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          ref={animRef}
          source={currentAnimation}
          loop={false}
          style={
            currentAnimation === require("../assets/animations/loader.json")
              ? { width: 400, height: 400 }
              : { width: 100, height: 100 }
          }
          onAnimationFinish={handleAnimationFinish}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UploadScreen;
