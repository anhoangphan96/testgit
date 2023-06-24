import { useEffect, useState } from "react";
import styles from "./UserForm.module.css";
import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

const UserForm = () => {
  //khai báo biến chứa các error, nếu ban đầu chưa có lỗi nào thì sẽ là object rỗng
  let dataError = useActionData() ?? {};
  //Khai báo hook để lấy param URL và lấy giá trị mode, nếu mode là login thì biến isLogin là true
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  //Khai báo các biến dùng state quản lý cho các input Name, Email, Password, Phone và các biến có lỗi hay không của từng loại tương ứng
  const [enterName, setEnterName] = useState("");
  const [nameIsError, setNameIsError] = useState(false);
  const [enterEmail, setEnterEmail] = useState("");
  const [emailIsError, setEmailIsError] = useState(false);
  const [enterPassword, setEnterPassword] = useState("");
  const [passwordIsError, setpasswordIsError] = useState(false);
  const [enterPhone, setEnterPhone] = useState("");
  const [phoneIsError, setPhoneIsError] = useState(false);
  //Khai báo biến dùng state để quản lý có đang chuyển giữa 2 mode hay không
  const [isChangeMode, setIsChangeMode] = useState(false);

  // Các function để quản lý onChange của các input
  //Nếu như đang có lỗi mà user input lại thì biến quản lý lỗi của input đó sẽ thành true để biến mất các classstyle lỗi và xóa nội dung của lỗi trong dataError
  const passwordInputHandler = (event) => {
    setEnterPassword(event.target.value);
    if (
      (dataError.password === "Your password must be more than 8 characters" &&
        event.target.value.length >= 8) ||
      (dataError.password === "You must input password field" &&
        event.target.value.length >= 1)
    ) {
      dataError.password = "";
      setpasswordIsError((prev) => false);
    }
  };
  const changeNameHandler = (event) => {
    setEnterName(event.target.value);
    if (event.target.value.length >= 1) {
      dataError.name = "";
      setNameIsError((prev) => false);
    }
  };
  const changeEmailHandler = (event) => {
    setEnterEmail(event.target.value);
    if (event.target.value.length >= 1) {
      dataError.email = "";
      setEmailIsError(false);
    }
  };
  const changePhoneHandler = (event) => {
    setEnterPhone(event.target.value);
    if (event.target.value.length >= 1) {
      dataError.phone = "";
      setPhoneIsError(false);
    }
  };
  // Sử dụng useEffect nếu như có data của lỗi tương ứng trong dataError thì set biến quản lý lỗi thành true tức là đang có lỗi
  useEffect(() => {
    if (dataError.password) {
      setpasswordIsError((prev) => true);
    }
    if (dataError.name) {
      setNameIsError((prev) => true);
    }
    if (dataError.email) {
      setEmailIsError((prev) => true);
    }
    if (dataError.phone) {
      setPhoneIsError((prev) => true);
    }
  }, [dataError.password, dataError.name, dataError.email, dataError.phone]);

  // Khi submit form ở chế độ login thì sẽ xóa passWord
  const submitFormHandler = () => {
    if (isLogin) {
      setEnterPassword("");
    }
  };
  //tạo hàm xóa data và các lỗi của các input khi click thay đổi mode giữa login và sign up, set biến hiển thị ...Loading
  const changeModeHanlder = () => {
    setIsChangeMode(true);
  };
  useEffect(() => {
    setEnterPassword("");
    setEnterName("");
    setEnterEmail("");
    setEnterPhone("");
    setEmailIsError((prev) => false);
    setpasswordIsError((prev) => false);
    setNameIsError((prev) => false);
    setPhoneIsError((prev) => false);
    setIsChangeMode(false);
  }, [isLogin]);

  //Khi click change giữa mode login và signup sẽ hiễn thị message ...Loading
  //component return JSX xây dựng form data cho cả 2 chế độ login và signup render phụ thuộc vào mode lấy từ params
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {isChangeMode ? (
          <p className={styles.loadingMessage}>...Loading</p>
        ) : (
          <Form
            onSubmit={submitFormHandler}
            method="post"
            className={styles.form}
          >
            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
            {!isLogin && (
              <input
                placeholder="Full Name"
                type="text"
                id="name"
                name="name"
                value={enterName}
                onChange={changeNameHandler}
                className={nameIsError ? styles.invalidInput : ""}
              ></input>
            )}
            {nameIsError && (
              <p className={styles.listError}>{dataError.name}</p>
            )}
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={enterEmail}
              onChange={changeEmailHandler}
              className={emailIsError ? styles.invalidInput : ""}
            ></input>
            {dataError.email && emailIsError && (
              <p className={styles.listError}>{dataError.email}</p>
            )}
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              onChange={passwordInputHandler}
              value={enterPassword}
              className={passwordIsError ? styles.invalidInput : ""}
            ></input>
            {dataError.password && passwordIsError && (
              <p className={styles.listError}>{dataError.password}</p>
            )}
            {!isLogin && (
              <input
                placeholder="Phone"
                type="number"
                id="phone"
                name="phone"
                value={enterPhone}
                onChange={changePhoneHandler}
                className={phoneIsError ? styles.invalidInput : ""}
              ></input>
            )}
            {dataError.phone && phoneIsError && (
              <p className={styles.listError}>{dataError.phone}</p>
            )}

            <button>{isLogin ? "SIGN IN" : "SIGN UP"}</button>
            <span>
              {isLogin ? "Create an account? " : "Login? "}
              <Link
                to={`/login?mode=${isLogin ? "signup" : "login"}`}
                onClick={changeModeHanlder}
              >
                {isLogin ? "Sign Up" : "Click"}
              </Link>
            </span>
          </Form>
        )}
      </div>
    </div>
  );
};
export default UserForm;
