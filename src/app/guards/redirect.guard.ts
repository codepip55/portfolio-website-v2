import { CanActivateFn } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  window.open(route.data['externalUrl'], "_blank")
  return true;
};
