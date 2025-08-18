// export class HasAccess {
//   public static user(
//     userAccess: IUserAccess | undefined,
//     module: TModule,
//     action: TAction
//   ): boolean {
//     if (!userAccess) return false;

//     const roleAccess = this.role(userAccess.roles, module, action);
//     const includeAccess = this.hasPermission(userAccess.includes, module, action);
//     const excludeAccess = this.hasPermission(userAccess.excludes, module, action);

//     return (roleAccess || includeAccess) && !excludeAccess;
//   }

//   private static role(roles: IRole[], module: TModule, action: TAction): boolean {
//     if (!roles) return false;

//     for (const role of roles) {
//       if (role.root) return true;

//       const parentAccess = role.parent ? this.role([role.parent], module, action) : false;
//       const roleInclude = this.hasPermission(role.includes, module, action);
//       const roleExclude = this.hasPermission(role.excludes, module, action);
//       const access = parentAccess ? !roleExclude : roleInclude && !roleExclude;

//       if (access) return true;
//     }

//     return false;
//   }

//   private static hasPermission(
//     permissions: IRolePermissionRule[],
//     module: TModule,
//     action: TAction
//   ): boolean {
//     return permissions.some(
//       i =>
//         (i.module === module || i.module === "*") &&
//         (i.actions.includes(action) || i.actions.includes("*"))
//     );
//   }
// }
