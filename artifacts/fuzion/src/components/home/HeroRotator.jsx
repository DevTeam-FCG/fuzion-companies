import { useEffect, useState } from "react";

const PHOTOS = [
  "https://media.base44.com/images/public/6a02527a727fcfaa45765426/87a18d5c2_FourTractorTrailers-Loaded-DisasterSupport-Copy.jpg",
  "https://media.base44.com/images/public/6a02527a727fcfaa45765426/d01dbc815_IMG_9874-Copy.JPG",
  "https://media.base44.com/images/public/6a02527a727fcfaa45765426/a9be91ea9_DonatedHay-NightTimeLoadingUp-DisasterReliefSupport.jpg",
  "https://media.base44.com/images/public/6a02527a727fcfaa45765426/6fd9ed498_LargeConstructionProjectP1.jpg",
  "https://media.base44.com/images/public/6a02527a727fcfaa45765426/49fc3dcd5_TransmissionLinesP3.jpg",
];

const FADE_MS = 1500;
const HOLD_MS = 6500;

export default function HeroRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, HOLD_MS + FADE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: i === index ? "scale(1.05)" : "scale(1)",
            transition: `opacity ${FADE_MS}ms ease-in-out, transform ${HOLD_MS + FADE_MS}ms ease-out`,
          }}
        />
      ))}
      {/* Navy gradient overlay — keeps headline crisp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.78) 50%, rgba(13,31,60,0.85) 100%)",
        }}
      />
    </div>
  );
}