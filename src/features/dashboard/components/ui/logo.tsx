function Logo() {
  return (
    <div className="bg-primary relative w-fit rounded-r-2xl  p-4 ">
      <div
        className="absolute bottom-0 left-0 z-10 h-1/2 w-full rounded-tl-2xl rounded-br-2xl
      bg-violet-400"
      />
      <img className="relative z-50 " src="/public/logo.svg" alt="" />
    </div>
  );
}

export default Logo;
