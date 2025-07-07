import { AnimatedCounter } from "react-animated-counter";
import React, { useEffect } from "react";
import coinsSound from "@assets/coin.mp3";

export const BalanceCounter = ({ balance }) => {
  useEffect(() => {
    const audio = document.createElement("audio");
    audio.src = coinsSound;
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

    return () => {
      if (audio) {
        audio.pause();
        audio.remove();
      }
    };
  }, []);

  return (
    <>
      <AnimatedCounter value={balance} fontSize="11px" color="#ffffff" />
    </>
  );
};
