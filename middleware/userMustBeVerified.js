function routeException (route, names) {
  return [...names].includes(route.name)
}

export default function ({ $auth, redirect, route }) {
  if ($auth.loggedIn && !routeException(route, ['auth-verification', 'auth-logout'])) {
    if (!$auth.user.email_verified_at) {
      return redirect('/auth/verification')
    }
  }
}
