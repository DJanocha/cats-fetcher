import Image from "next/image";
export type Color = "red" | "green" | "blue";
export const CatsDisplayer = ({ src }: { src: string }) => {
  return src?.length > 0 ? (
    <Image src={src} alt="image cat sth" width={150} height={200} />
  ) : (
    <span>'nie da rady'</span>
  );
};
