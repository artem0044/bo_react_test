export const playSound = (sound) => {
  const audio = document.createElement("audio");
  audio.src = sound;
  audio.onloadeddata = async () => {
    try {
      await audio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };
  audio.onended = () => {
    audio.remove();
  };
  document.body.appendChild(audio);
}