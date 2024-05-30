import {Credentials} from "./Credentials";
import {strings} from "@material/icon-button";

export class KeycloakUser {
  constructor(
    public id : string,
    public groups: string[],
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public emailVerified?: boolean,
    public attributes?: string[],
    public userProfileMetadata?: string,
    public self?: string,
    public origin?: string,
    public createdTimestamp?: number,
    public enabled?: boolean,
    public totp?: boolean,
    public federationLink?: string,
    public serviceAccountClientId?: string,
    public credentials?: Credentials,
    public disableableCredentialTypes?: string [],
    public requiredActions?: string [],
    public federatedIdentities?: string [],
    public realmRoles?: string [],
    public clientRoles?: string [],
    public clientConsents?: string [],
    public notBefore?: number,
    public applicationRoles?: string[],
    public socialLinks?: string[],
    public access?: boolean[],
  ) {}
}
