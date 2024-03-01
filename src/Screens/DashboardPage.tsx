import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { ResizeMode, Video, Audio } from "expo-av";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../Utils/scalingMetrics";

const DashboardPage = () => {
  const [progress, setProgress] = React.useState(0);
  const [currentMinute, setCurrentMinute] = React.useState(10);
  const [currentSecond, setCurrentSecond] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(600);
  const [timer, setTimer] = React.useState(selectedTime);
  const [status, setStatus] = React.useState<any>({});
  const [videoStatus, setVideoStatus] = React.useState<"playing" | "paused">(
    "paused"
  );
  const [isSun, setIsSun] = React.useState(false);
  const videoRef = useRef<any>();
  const [sound, setSound] = useState<any>();

  const videoUrl = require("../assets/video/rain.mp4");
  const beachVideo = require("../assets/video/beachNewOne.mp4");

  const imageIcon = !status.isPlaying
    ? require("../assets/play.png")
    : require("../assets/pause.png");
  const soundSource = isSun
    ? require("../assets/Sound/rainSound.mp3")
    : require("../assets/Sound/beachSound.mp3");

  const startTimer = React.useCallback((duration) => {
    setTimer(duration);
    setSelectedTime(duration);
    setMinuteAndSecond(duration);
  }, []);
  const setMinuteAndSecond = (updatedTimer) => {
    const minutes = Math.floor(updatedTimer / 60);
    const seconds = updatedTimer % 60;

    setCurrentMinute(minutes);
    setCurrentSecond(seconds);
  };
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundSource);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function stopSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundSource);
    setSound(sound);

    console.log("Playing Sound");
    await sound.pauseAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    if (timer > 0 && videoStatus === "playing") {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        setMinuteAndSecond(timer);

        const progressPercentage = Math.round((timer / selectedTime) * 100);
        setProgress(progressPercentage);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [videoStatus, timer]);
  const timerIsLessThenOne = () =>
    timer < 1 &&
    (videoRef.current?.pauseAsync(),
    sound.pauseAsync(),
    setProgress(0),
    setIsPlaying(false),
    setTimer(selectedTime),
    setVideoStatus("paused"),
    true);
  React.useEffect(() => {
    timerIsLessThenOne();
  }, [timer]);
  const handlePlayPauseButton = () => {
    const isPlaying = status.isPlaying;
    isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync();
    isPlaying ? stopSound() : playSound();
    setVideoStatus(isPlaying ? "paused" : "playing");
  };
  const handleRainIcon = () => {
    setIsSun(false);
    setMinuteAndSecond(selectedTime);
    setIsPlaying(false);
    if (status.isPlaying) {
      setProgress(0);
      setVideoStatus("paused");
      videoRef.current?.pauseAsync();
      sound.pauseAsync();
    }
    setTimer(selectedTime);
  };
  const handleSunButton = () => {
    setIsSun(true);
    setIsPlaying(false);
    if (status.isPlaying) {
      setProgress(0);
      setVideoStatus("paused");
      videoRef.current?.pauseAsync();
      sound.pauseAsync();
    }
    setTimer(selectedTime);
    setMinuteAndSecond(selectedTime);
  };
  const renderAnimatedProgressBar = () => (
    <AnimatedCircularProgress
      fillLineCap="round"
      rotation={0}
      size={200}
      width={10}
      fill={progress}
      tintColor="#00e0ff"
      backgroundColor="#3d5875"
      onAnimationComplete={() => {
        if (timer === 0) {
          setIsPlaying(false);
        }
      }}
    >
      {(fill) => (
        <TouchableOpacity onPress={() => handlePlayPauseButton()}>
          <Image
            tintColor={"white"}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
            source={imageIcon}
          />
        </TouchableOpacity>
      )}
    </AnimatedCircularProgress>
  );
  const renderTopPart = () => (
    <>
      <Text style={{ textAlign: "center", maxWidth: "70%", color: "white" }}>
        For a lot more info about this topic, I suggest visiting my INTRO to
        meditation page
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: verticalScale(15),
        }}
      >
        <TouchableOpacity
          style={styles.minuteButtonStyle}
          onPress={() => startTimer(120)}
        >
          <Text style={styles.minuteButtonText}>2</Text>
          <Text style={{ color: "#C8776F", fontWeight: "bold" }}>Minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.minuteButtonStyle}
          onPress={() => startTimer(300)}
        >
          <Text style={styles.minuteButtonText}>5</Text>
          <Text style={{ color: "#DA8523", fontWeight: "bold" }}>Minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.minuteButtonStyle}
          onPress={() => startTimer(600)}
        >
          <Text style={styles.minuteButtonText}>10</Text>
          <Text style={{ color: "#C062A1", fontWeight: "bold" }}>Minutes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const renderMiddlePart = () => (
    <View
      style={{
        marginTop: "25%",
        alignItems: "center",
      }}
    >
      {renderAnimatedProgressBar()}

      <Text
        style={{
          fontSize: moderateScale(26),
          fontWeight: "bold",
          color: "black",
          marginTop: verticalScale(20),
        }}
      >
        {currentMinute +
          ":" +
          (currentSecond < 10 ? "0" + currentSecond : currentSecond)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: verticalScale(50),
        }}
      >
        <TouchableOpacity
          onPress={() => handleRainIcon()}
          style={styles.roundView}
        >
          <Image
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            source={require("../assets/rain.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSunButton()}
          style={[styles.roundView, { backgroundColor: "#A14F49" }]}
        >
          <Image
            tintColor={"white"}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            source={require("../assets/sun.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const rednerFooterPart = () => (
    <View style={{ marginTop: verticalScale(40) }}>
      <Text
        style={{
          textAlign: "center",
          maxWidth: "70%",
          fontWeight: "500",
          fontSize: moderateScale(22),
          color: "white",
        }}
      >
        May I also suggest the Breather app
      </Text>
    </View>
  );
  const renderPlayer = () => (
    <Video
      ref={videoRef}
      style={styles.video}
      source={!isSun ? videoUrl : beachVideo}
      resizeMode={ResizeMode.COVER}
      isLooping={true}
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
  const renderChildren = () => (
    <View
      style={{
        position: "absolute",
        paddingHorizontal: horizontalScale(25),
        marginTop: verticalScale(30),
        alignItems: "center",
      }}
    >
      {renderTopPart()}
      {renderMiddlePart()}
      {rednerFooterPart()}
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      {renderPlayer()}
      {renderChildren()}
    </View>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  minuteButtonText: {
    color: "black",
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
  minuteButtonStyle: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    marginEnd: horizontalScale(15),
    alignItems: "center",
    borderColor: "white",
  },
  roundView: {
    width: horizontalScale(60),
    height: verticalScale(60),
    backgroundColor: "#4972A1",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    marginRight: horizontalScale(20),
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
