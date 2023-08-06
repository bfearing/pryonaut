const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <svg
        width="100%"
        height="100%"
        viewBox="-10.5 -9.45 21 18.9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex w-20 h-20 animate-[spin_3s_linear_infinite]"
      >
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>
      <h2 className="tracking-tight">{text}</h2>
    </div>
  );
};

export default Loading;
