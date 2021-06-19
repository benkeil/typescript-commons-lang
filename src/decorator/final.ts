export default function final(): ClassDecorator {
  return (target) => {
    Object.seal(target);
    Object.seal(target.prototype);
  };
}
