export default function experimental() {
  return <TFunction extends Function>(
    target: TFunction | Object,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const targetName = target instanceof Function ? target.name : `${target.constructor.name}.${String(propertyKey)}`;
    console.warn(`${targetName} is marked as experimental.`);
  };
}
