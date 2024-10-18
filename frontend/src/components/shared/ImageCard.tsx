const ImageCard = ({
  imageSrc,
  title,
  uploadDate,
}: {
  imageSrc: string;
  title: string;
  uploadDate: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">Uploaded on {uploadDate}</p>
      </div>
    </div>
  );
};

export default ImageCard;
