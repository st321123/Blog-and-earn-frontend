function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-4 bg-white rounded-full shadow-md">
        <ClipLoader color="#00BFFF" size={50} loading={true} />
      </div>
    </div>
  );
}
