function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 gap-5 w-full max-w-xs">
        <a href="/login" className="text-lg text-indigo-500 font-medium">Link a Login</a>
      </div>
    </div>
  );
}

export default Home;
