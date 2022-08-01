const Alert = ({ message, type }) => {
  if (!message) return null;
  return <div className={["alert", type].join(" ")}>{message}</div>;
};

export default Alert;
