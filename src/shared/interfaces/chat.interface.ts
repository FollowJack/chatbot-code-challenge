export interface IFlowOption {
  nextId: Number;
  value: String;
  text: String;
  name: String;
}

export interface IFlowAnswer {
  id: Number;
  nextId: Number;
  value: String;
  text: String;
  name: String;
}

export interface IFlowMessage {
  id: Number;
  name: String;
  text: String;
  uiType: String;
  valueType: String;
  valueOptions: IFlowOption[];
}
