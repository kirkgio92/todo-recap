import styles from "./index.module.scss";
import Image from "next/image";

const User = () => {
  return (
    <>
      <div className={styles.userWrapper}>
        <Image
          className={styles.image}
          src={
            "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
          }
          alt={"kirkgio92"}
          width={100}
          height={100}
        />
        <h2>kirkgio92</h2>
      </div>
    </>
  );
};

export default User;
