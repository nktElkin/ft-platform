import Image from "next/image";

export const Logo = () => {
    return(
        <Image
                src="/130logo.svg" 
                alt="Logo"
                height={130}
                width={130}
        />
    );
};
