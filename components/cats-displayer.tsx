import Image from "next/image";
import styles from "../styles/Home.module.css";

export type Color = "red" | "green" | "blue";
export const CatsDisplayer = ({ src }: { src: string }) => {
  if (src.length === 0) {
    return null;
  }
  return (
    <Image
      src={src}
      alt="cat could not be generated"
      width={300}
      height={400}
      className={styles.photo}
    />
  );
};
