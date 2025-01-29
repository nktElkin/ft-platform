interface HeaderBannerProps {
    imageSrc: string;
    title: string;
    description: string;
}

const HeaderBanner = ({imageSrc, title, description}:HeaderBannerProps) => {
    return (
        <div className="relative h-80 *:absolute">
                {imageSrc ? <img src={imageSrc} alt="course wallpaper" className="overflow-hidden h-80 object-cover rounded-t-md mb-3 blur-md -z-10"/> : ""}
                <div className="bottom-0 left-0 pb-4">
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                </div>
                </div>
    );
}
 
export default HeaderBanner;