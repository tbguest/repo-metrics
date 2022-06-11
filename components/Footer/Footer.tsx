import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made by&nbsp;
      <a href="https://github.com/tbguest/">@tbguest</a>
    </footer>
  );
};

export { Footer };
