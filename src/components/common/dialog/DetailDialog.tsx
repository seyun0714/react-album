import { CardDTO } from "@/pages/index/types/card";
import styles from "./DetailDialog.module.scss";
import { useEffect, useState } from "react";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
}

function DetailDialog({ data, handleDialog }: Props) {
  const [bookmark, setBookmark] = useState(false);
  const [storedValue, setStoredValue] = useState(
    JSON.parse(localStorage.getItem("bookmark") || "[]")
  );

  // 다이얼로그 열 때 북마크 체크크
  useEffect(() => {
    const isStored = storedValue.findIndex((item) => item.id === data.id) > -1;
    setBookmark(isStored);
  }, [data]);

  // 다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
  };

  // 북마크 추가 및 제거
  const handleBookmark = (selected: CardDTO) => {
    setBookmark(!bookmark);
    // case 1 : 북마크가 아예 비어있을 때
    if (!storedValue || storedValue === null) {
      localStorage.setItem("bookmark", JSON.stringify([selected]));
      toast("해당 이미지를 북마크에 저장하였습니다. 😊");
    } else {
      // case2 : 해당 이미지가 북마크에 저장되어 있을 때
      if (
        storedValue.findIndex((item: CardDTO) => item.id === selected.id) > -1
      ) {
        const res = storedValue.filter(
          (item: CardDTO) => item.id != selected.id
        );
        console.log(res);
        localStorage.setItem("bookmark", JSON.stringify(res));
        setStoredValue(res);
        toast("해당 이미지가 북마크에서 제거되었습니다. ❌");
      } else {
        // case 3 : 북마크가 이미 있지만, 해당 이미지는 저장 안되어 있을 때
        const res = [...storedValue];
        res.push(selected);
        setStoredValue(res);
        localStorage.setItem("bookmark", JSON.stringify(res));
        toast("해당 이미지를 북마크에 저장하였습니다. 😊");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 28 + "px" }}
              >
                close
              </span>
            </button>
            <img
              src={data.user.profile_image.small}
              alt="사진작가 프로필 사진"
              className={styles.close__authorImage}
            ></img>
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button
              className={styles.bookmark__button}
              onClick={() => handleBookmark(data)}
            >
              {bookmark === false ? (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 + "px" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 + "px", color: "red" }}
                >
                  favorite
                </span>
              )}
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>
        <div className={styles.container__dialog__body}>
          <img
            src={data.urls.small}
            alt="상세 이미지"
            className={styles.image}
          />
        </div>
        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item_value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item_value}>
                {data.created_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.infoBox__item_value}>
                {data.updated_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item_value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>{data.description}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
