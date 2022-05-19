export class FindUsersFilterDto {
  page?: number = 1;
  perPage?: number = 10;
  email?: string;
  firstName?: string;
  lastName?: string;
  finCode?: string;
  isActive?: boolean;

  public static fromRequestParams(reqParams: any): FindUsersFilterDto {
    if (!reqParams) return null;
    const dto = new FindUsersFilterDto();
    dto.page = reqParams.page;
    dto.perPage = reqParams.perPage;
    dto.email = reqParams.email;
    dto.firstName = reqParams.firstName;
    dto.lastName = reqParams.lastName;
    dto.finCode = reqParams.finCode;
    dto.isActive = reqParams.isActive;
    return dto;
  }
}
