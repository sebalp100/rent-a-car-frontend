import { useRef, useEffect } from 'react';
import './VideoBackground.css';
import { Link } from 'react-router-dom';

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.play();

    videoElement.addEventListener('ended', () => videoElement.play());

    return () => {
      videoElement.removeEventListener('ended', () => videoElement.play());
    };
  }, []);

  return (
    <div className="video-background">
      <video ref={videoRef} className="video" autoPlay muted loop>
        <source src="images/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-overlay">
        <h1 className="text-6xl font-bold text-white leading-normal pb-10">
          RENT THE <span className="text-orange-500">CAR</span> OF YOUR DREAMS
          TODAY
        </h1>
      </div>
    </div>
  );
};

export default VideoBackground;
