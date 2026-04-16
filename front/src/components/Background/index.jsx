
function Background({ children }) {
  return (
    <div
      className="relative min-h-screen pb-72 sm:pb-15 w-full bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="flex flex-col items-center relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default Background;