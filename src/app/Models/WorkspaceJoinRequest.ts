export class WorkspaceJoinRequest {
  constructor(
    public requestId: number,
    public workspaceId: number,
    public requesterUserId: string,
    public status :string,
    public createdAt: Date,
    public editedAt: Date) {}
}
