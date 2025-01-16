import styles from "./CommonFooter.module.scss";

function CommonFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button}>
          <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" />
          {/* 변경될 UI 부분 */}
        </button>
        <span>1</span>
        <button className={styles.pagination__button}>
          <img src="/src/assets/icons/icon-arrowRight.svg" alt="" />
          {/* 변경될 UI 부분 */}
        </button>
      </div>
    </div>
  );
}

export default CommonFooter;
