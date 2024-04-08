import { useEffect, useRef, useState } from "react";

const LazyImage = ({ image }) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <img
      style={loaded ? { opacity: 1 } : { opacity: 0 }}
      onLoad={() => setLoaded(true)}
      ref={ref}
      src={image}
      className="w-full h-full object-cover transition duration-500 ease-in-out"
      alt="image"
    />
  ) : (
    <div ref={ref} className="h-[6rem] bg-white"></div>
  );
};

export default LazyImage;
