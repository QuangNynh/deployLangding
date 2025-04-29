"use client";
import { useEffect, useState, useRef } from 'react';

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentDate = new Date().toDateString();
    let lastViewedDate;
    try {
      lastViewedDate = localStorage.getItem('lastIntroView');
    } catch (error) {
      console.error("Lỗi truy cập localStorage:", error);
      setIsVisible(true);
      return;
    }

    if (!lastViewedDate || lastViewedDate !== currentDate) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.error("Lỗi phát video:", error);
        // Nếu không phát được, vẫn ẩn sau 6.5s
        setTimeout(() => {
          setIsVisible(false);
          try {
            localStorage.setItem('lastIntroView', new Date().toDateString());
          } catch (error) {
            console.error("Lỗi lưu localStorage:", error);
          }
        }, 6500);
      });

      const timer = setTimeout(() => {
        setIsVisible(false);
        try {
          localStorage.setItem('lastIntroView', new Date().toDateString());
        } catch (error) {
          console.error("Lỗi lưu localStorage:", error);
        }
      }, 6500);

      return () => clearTimeout(timer);
    };

    // Fallback nếu video không tải hoặc không phát trong 3 giây
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        localStorage.setItem('lastIntroView', new Date().toDateString());
      } catch (error) {
        console.error("Lỗi lưu localStorage:", error);
      }
    }, 3000);

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.pause();
      clearTimeout(fallbackTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <section className="fixed inset-0 z-[201] flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="images/intro-katech.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default IntroSection;