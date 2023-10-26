function replace() {
    return (
      <div className="w-full min-h-screen flex justify-center items-center mt-16">
        <div className="grid grid-cols-1 gap-5 w-full max-w-xs">
          <a href="/login" className="text-lg text-indigo-500 font-medium">Link a Login</a>
          <a href="/uploadImage" ><div className="bg-indigo-500 rounded-md p-2 text-lg text-white">Upload Image</div></a>
  
        </div>
      </div>
    );
  }
  
  export default replace;
  