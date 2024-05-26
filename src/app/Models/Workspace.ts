export class Workspace {
  constructor(
    public workspaceId: number,
    public title: string,
    public ownerId: string,
    public memberIds: string[],
    public publicWorkspace: boolean,
    public inviteOnly: boolean
  ) {}

  get memberCount(): number {
    return this.memberIds.length;
  }
}