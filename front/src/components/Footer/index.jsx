
function Footer() {
  return (
    <footer className="
      absolute
      bottom-0
      w-full
      text-center
      text-white/70
      text-sm
      uw:bg-yellow-500
    ">

        <p>© {new Date().getFullYear()} Açougue Santo Antônio</p>
      <p className="text-white/50">Matheus Ferraz</p>
    </footer>
  );
}

export default Footer;