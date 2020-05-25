export class LeaveModel {
  constructor(
    public lId: number
  ) {}
}

export class SheetModel {
}

export class StorageModel {

  constructor(
    public eId: number,
    public eName: string,
    public eAbv: string,
    public eEmail: string,
    public eIsAdmin: boolean,
    public eStatus: string,
    public nameId: string,
    public Leaves: LeaveModel[],
    public Sheets: SheetModel[]
  ) {}
}
