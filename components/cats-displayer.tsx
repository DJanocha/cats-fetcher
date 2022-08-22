import Image from "next/image";
export type Color = "red" | "green" | "blue";
export const CatsDisplayer = ({ src }: { src: string }) => {
  if (src.length === 0) {
    return null;
  }
  return <Image src={src} alt="image cat sth" width={300} height={400} />;
};
