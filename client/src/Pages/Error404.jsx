function Error404() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 mt-16">
      <div className="text-center">
        <h1 className="text-4xl font-medium">404</h1>
        <p className="text-xl font-medium m-6">
          Lo sentimos. La página que busca no existe.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  );
}

export default Error404;
