export default function state(mapping) {
  return (DriverClass) => {
    if (mapping) {
      //TODO BRN: Wrap DriverClass
      return DriverClass;
    }
    return DriverClass;
  };
}
