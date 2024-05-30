export class Workspace {
  constructor(
    public workspaceId: number,
    public title: string,
    public ownerId: string,
    public memberIds: string[],
    public moderatorIds: string[],
    public publicWorkspace: boolean,
    public inviteOnly: boolean,
    public workspaceLections: number[],
    public joinRequests: number[],
  ) {}

  get memberCount(): number {
    return this.memberIds.length;
  }
}
