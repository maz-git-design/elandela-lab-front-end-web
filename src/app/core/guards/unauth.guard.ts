// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { AuthStore } from "../../data/auth/auth.store";

// export const UnauthGuard: CanActivateFn = () => {
//   const authStore = inject(AuthStore);
//   const router = inject(Router);

//   if (!authStore.connected()) return true;

//   router.navigate(["/granted/dashboard"]);
//   return false;
// };
