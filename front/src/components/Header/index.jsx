function Header({ size = "h-24" }) { 
  return (
    <div className="flex justify-center py-4">
      <img
        className={`${size} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-500 ease-in-out`}
        src="/images/logo.png"
        alt="Logo Açougue"
      />
    </div>
  );
}

export default Header;