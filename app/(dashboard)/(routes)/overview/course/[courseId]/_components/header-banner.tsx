interface HeaderBannerProps {
  imageSrc: string;
  title: string;
  description: string;
}

const HeaderBanner = ({ imageSrc, title, description }: HeaderBannerProps) => {
  return (
    <div className="relative h-80 sm:h-96 md:h-112 lg:h-128 md:pl-3 2xl:pl-0">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="course wallpaper"
          className="overflow-hidden h-full w-full object-cover rounded-t-md mb-3 blur-md -z-10"
        />
      ) : (
        ""
      )}
      <div className="absolute bottom-0 left-0 pb-4 w-sm sm:w-fit text-wrap p-4 text-gray-900">
        <h1 className="text-lg sm:text-5xl" aria-label="Course title">{title}</h1>
        <h5 className="text-sm sm:text-lg md:text-lg lg:text-xl" aria-label="Course description">{description}</h5>
      </div>
    </div>
  );
};

export default HeaderBanner;
