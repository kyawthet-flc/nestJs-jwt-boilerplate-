export type ResMessage = {
  status: string;
  msg: string;
};

export class ResponseHelper {
  constructor(private res: any) {}

  // public reportToAdmin(): void {
  //   console.log('REPORTED TO ADMIN!');
  //   console.log(this.res);
  //   return;
  // }

  public failed(): ResMessage {
    return {
      status: this.res.status,
      msg: this.res.msg,
    };
  }

  public successful(): ResMessage {
    return {
      status: this.res.status,
      msg: this.res.msg,
    };
  }

}
